import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function usage() {
  console.error('Usage: node tools/openapi-codegen.mjs --src <path-or-url> [--out <dir>]');
  process.exit(1);
}

function parseArgs(argv) {
  const args = { src: undefined, out: path.join('src', 'app', 'api', 'openapi'), style: 'openapi' };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--src') {
      args.src = argv[++i];
    } else if (a === '--out') {
      args.out = argv[++i];
    } else if (a === '--style') {
      args.style = argv[++i];
    }
  }
  return args;
}

async function loadSpec(src) {
  if (!src) {
    // default to local swagger.json if present
    const local = path.join(rootDir, 'src', 'assets', 'api', 'swagger.json');
    if (!fs.existsSync(local)) {
      throw new Error('No --src provided and default src/assets/api/swagger.json not found');
    }
    const raw = fs.readFileSync(local, 'utf-8');
    return JSON.parse(raw);
  }
  if (/^https?:\/\//i.test(src)) {
    // Lazy import fetch to support Node 18+
    const res = await fetch(src);
    if (!res.ok) {
      throw new Error(`Failed to fetch OpenAPI spec: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  }
  const full = path.isAbsolute(src) ? src : path.join(rootDir, src);
  const raw = fs.readFileSync(full, 'utf-8');
  return JSON.parse(raw);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function pascalCase(value) {
  return String(value)
    .replace(/([\W_]+)/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function camelCase(value) {
  const parts = pascalCase(value);
  return parts ? parts.charAt(0).toLowerCase() + parts.slice(1) : '';
}

function normalizeOpenApiPath(p) {
  // Convert /items/{id}/child/{childId} => /items/:id/child/:childId
  return p.replace(/\{([^}]+)\}/g, ':$1');
}

function firstTag(op) {
  if (Array.isArray(op.tags) && op.tags.length > 0) return String(op.tags[0]);
  return 'default';
}

function methodNameFrom(op, httpMethod, rawPath) {
  if (op.operationId) return camelCase(op.operationId);
  const base = `${httpMethod}_${rawPath}`.replace(/[^a-zA-Z0-9]+/g, ' ').trim();
  return camelCase(base);
}

function collectOperations(spec) {
  const paths = spec.paths || {};
  const opsByTag = new Map();
  for (const [rawPath, methods] of Object.entries(paths)) {
    for (const [m, op] of Object.entries(methods)) {
      const httpMethod = m.toUpperCase();
      if (!['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(httpMethod)) continue;
      const tag = firstTag(op);
      const list = opsByTag.get(tag) || [];
      list.push({ httpMethod, rawPath, op });
      opsByTag.set(tag, list);
    }
  }
  return opsByTag;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// --- Type generation helpers ---
let __resolveType;

function isRef(obj) {
  return obj && typeof obj === 'object' && typeof obj['$ref'] === 'string';
}

function refName(ref) {
  const m = String(ref).match(/#\/(?:components\/schemas|definitions)\/([^/#]+)/);
  return m ? m[1] : String(ref).split('/').pop();
}

function tsTypeForPrimitive(type, format) {
  switch (type) {
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'string':
      return 'string';
    default:
      return 'unknown';
  }
}

function collectSchemas(spec) {
  const schemas = (spec.components && spec.components.schemas) || {};
  return new Map(Object.entries(schemas));
}

function renderEnum(name, schema) {
  const values = schema.enum || [];
  if (!Array.isArray(values) || values.length === 0) return null;
  const literals = values
    .map((v) => (typeof v === 'string' ? `'${v.replace(/'/g, "\\'")}'` : String(v)))
    .join(' | ');
  return `export type ${name} = ${literals};`;
}

function renderInterface(name, schema, resolveType) {
  const lines = [];
  lines.push(`export interface ${name} {`);
  const required = new Set(Array.isArray(schema.required) ? schema.required : []);
  const props = schema.properties || {};
  for (const [rawKey, propSchema] of Object.entries(props)) {
    const key = quoteProp(rawKey);
    const optional = required.has(rawKey) ? '' : '?';
    const t = resolveType(propSchema, `${name}${pascalCase(rawKey)}`);
    lines.push(`  ${key}${optional}: ${t};`);
  }
  if (schema.additionalProperties) {
    const apType = schema.additionalProperties === true ? 'unknown' : resolveType(schema.additionalProperties, `${name}AdditionalProperty`);
    lines.push(`  [key: string]: ${apType};`);
  }
  lines.push('}');
  return lines.join('\n');
}

function buildModelRenderer(spec) {
  const schemas = collectSchemas(spec);
  const declared = new Set();
  const outputs = [];

  function resolveType(schema, nameHint) {
    if (!schema || typeof schema !== 'object') return 'unknown';
    if (isRef(schema)) {
      const n = pascalCase(refName(schema['$ref']));
      return n;
    }
    if (schema.type === 'array') {
      const itemType = resolveType(schema.items, `${nameHint}Item`);
      return `${itemType}[]`;
    }
    if (schema.oneOf) {
      return schema.oneOf.map((s, i) => resolveType(s, `${nameHint}OneOf${i + 1}`)).join(' | ') || 'unknown';
    }
    if (schema.anyOf) {
      return schema.anyOf.map((s, i) => resolveType(s, `${nameHint}AnyOf${i + 1}`)).join(' | ') || 'unknown';
    }
    if (schema.allOf) {
      return schema.allOf.map((s, i) => resolveType(s, `${nameHint}AllOf${i + 1}`)).join(' & ') || 'unknown';
    }
    if (schema.enum) {
      const alias = pascalCase(nameHint);
      if (!declared.has(alias)) {
        const t = renderEnum(alias, schema);
        if (t) outputs.push(t);
        declared.add(alias);
      }
      return alias;
    }
    if (schema.type === 'object' || schema.properties || schema.additionalProperties) {
      const alias = pascalCase(nameHint);
      if (!declared.has(alias)) {
        const iface = renderInterface(alias, schema, resolveType);
        outputs.push(iface);
        declared.add(alias);
      }
      return alias;
    }
    return tsTypeForPrimitive(schema.type, schema.format);
  }

  function writeModels(outDir) {
    const lines = [];
    lines.push('/* eslint-disable */');
    lines.push('/* Auto-generated models from OpenAPI spec. Do not edit manually. */');

    // Named schemas
    for (const [schemaName, schema] of schemas.entries()) {
      const name = pascalCase(schemaName);
      if (schema && typeof schema === 'object' && Array.isArray(schema.enum)) {
        const t = renderEnum(name, schema);
        if (t) outputs.push(t);
        declared.add(name);
        continue;
      }
      if (schema && typeof schema === 'object' && (schema.type === 'object' || schema.properties || schema.additionalProperties)) {
        const iface = renderInterface(name, schema, resolveType);
        outputs.push(iface);
        declared.add(name);
      }
    }

    lines.push(outputs.join('\n\n'));
    const filePath = path.join(outDir, 'models.ts');
    fs.writeFileSync(filePath, lines.join('\n'));
    return filePath;
  }

  return { resolveType, writeModels };
}

function isValidTsIdentifier(name) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(String(name));
}

function quoteProp(name) {
  const s = String(name).replace(/"/g, '\\"');
  return isValidTsIdentifier(s) ? s : `"${s}"`;
}

function renderOptionsType(name, { hasPath, queryParams, hasBody, bodyType = 'unknown' }) {
  const lines = [];
  lines.push(`export interface ${name} {`);
  if (hasPath) {
    const entries = queryParams?.path || [];
    if (entries.length > 0) {
      lines.push('  pathParams: {');
      for (const p of entries) {
        const prop = quoteProp(p);
        lines.push(`    ${prop}: string | number;`);
      }
      lines.push('  };');
    } else {
      lines.push('  pathParams?: Record<string, string | number>;');
    }
  } else {
    lines.push('  pathParams?: undefined;');
  }
  const q = queryParams?.query || [];
  if (q.length > 0) {
    lines.push('  query?: {');
    for (const p of q) {
      const prop = quoteProp(p);
      lines.push(`    ${prop}?: string | number | boolean;`);
    }
    lines.push('  };');
  } else {
    lines.push('  query?: undefined;');
  }
  if (hasBody) {
    lines.push(`  body?: ${bodyType};`);
  } else {
    lines.push('  body?: undefined;');
  }
  lines.push('  headers?: Record<string, string>;');
  lines.push('}');
  return lines.join('\n');
}

function writeService(tag, ops, outDir, style = 'openapi') {
  const slug = slugify(tag);
  const className = style === 'postman' ? `${pascalCase(tag)}ApiService` : `${pascalCase(tag)}OpenApiService`;
  const fileDir = style === 'postman' ? path.join(outDir, slug) : outDir;
  ensureDir(fileDir);
  const corePathAbs = path.join(rootDir, 'src', 'app', 'core', 'http', 'api-client.service');
  const relativeCorePath = path.relative(fileDir, corePathAbs).replace(/\\/g, '/');
  const importPath = relativeCorePath.replace(/\.ts$/, '');
  const lines = [];
  lines.push('/* eslint-disable */');
  lines.push('/* Auto-generated from OpenAPI spec. Do not edit manually. */');
  lines.push("import { inject, Injectable } from '@angular/core';");
  lines.push("import { Observable } from 'rxjs';");
  lines.push(`import { ApiClient } from '${importPath}';`);
  lines.push('');

  const methodBlocks = [];
  const usedModelNames = new Set();
  for (const { httpMethod, rawPath, op } of ops) {
    const methodName = methodNameFrom(op, httpMethod, rawPath);
    const normPath = normalizeOpenApiPath(rawPath);
    const params = Array.isArray(op.parameters) ? op.parameters : [];
    const pathParams = params.filter((p) => p && p.in === 'path').map((p) => p.name);
    const queryParams = params.filter((p) => p && p.in === 'query').map((p) => p.name);
    const hasBody = !!op.requestBody;
    const optionsType = `${pascalCase(methodName)}Options`;
    const respSchema = firstJsonResponseSchema(op);
    const bodySchema = firstJsonRequestSchema(op);
    const respTs = respSchema ? getTypeAndCollect(respSchema, usedModelNames, `${pascalCase(methodName)}Response`) : 'unknown';
    const bodyTs = hasBody && bodySchema ? getTypeAndCollect(bodySchema, usedModelNames, `${pascalCase(methodName)}Request`) : 'unknown';
    const optionsTypeDef = renderOptionsType(optionsType, {
      hasPath: pathParams.length > 0,
      queryParams: { path: pathParams, query: queryParams },
      hasBody,
      bodyType: bodyTs,
    });
    lines.push(optionsTypeDef);
    lines.push('');

    const defaultClause = pathParams.length > 0 ? '' : ' = {}';
    const parts = [];
    parts.push(`${methodName}(options: ${optionsType}${defaultClause}): Observable<${respTs}> {`);
    parts.push(`  return this.client.request<${respTs}${hasBody ? `, ${bodyTs}` : ''}>('${httpMethod}', '${normPath}', {`);
    if (pathParams.length > 0) parts.push('    pathParams: options.pathParams,');
    if (queryParams.length > 0) parts.push('    queryParams: options.query,');
    if (hasBody) parts.push('    body: options.body,');
    // Headers
    if (hasBody) {
      parts.push('    headers: {');
      parts.push('      ...(options.headers ?? {}),');
      // choose first content type if available
      const contentTypes = op.requestBody?.content ? Object.keys(op.requestBody.content) : [];
      const ct = contentTypes[0] || 'application/json';
      parts.push(`      'Content-Type': '${ct}',`);
      parts.push('    },');
    } else {
      parts.push('    headers: options.headers,');
    }
    parts.push('  });');
    parts.push('}');
    methodBlocks.push(parts.join('\n'));
  }

  lines.push(`@Injectable({ providedIn: 'root' })`);
  lines.push(`export class ${className} {`);
  lines.push('  private readonly client = inject(ApiClient);');
  lines.push('');
  for (const block of methodBlocks) {
    lines.push('  ' + block.replace(/\n/g, '\n  '));
    lines.push('');
  }
  lines.push('}');

  const filePath = path.join(fileDir, `${slug}.api.ts`);
  if (usedModelNames.size > 0) {
    const modelsAbs = path.join(outDir, 'models.ts');
    const relModels = path.relative(fileDir, modelsAbs).replace(/\\/g, '/').replace(/\.ts$/, '');
    const typeImports = `import type { ${Array.from(usedModelNames).sort().join(', ')} } from '${relModels}';`;
    lines.splice(6, 0, typeImports);
  }
  fs.writeFileSync(filePath, lines.join('\n'));
  return { className, filePath };
}

function writeIndex(services, outDir, style = 'openapi') {
  const exports = services
    .map(({ className, filePath }) => {
      if (style === 'postman') {
        const dir = path.basename(path.dirname(filePath));
        const base = path.basename(filePath, '.ts');
        return `export { ${className} } from './${dir}/${base}';`;
      }
      const rel = './' + path.basename(filePath).replace(/\\/g, '/').replace(/\.ts$/, '');
      return `export { ${className} } from '${rel}';`;
    })
    .join('\n');
  fs.writeFileSync(path.join(outDir, 'index.ts'), exports + '\n');
}

async function main() {
  const args = parseArgs(process.argv);
  const outDir = path.isAbsolute(args.out) ? args.out : path.join(rootDir, args.out);
  const spec = await loadSpec(args.src);
  const { resolveType, writeModels } = buildModelRenderer(spec);
  __resolveType = resolveType;
  const opsByTag = collectOperations(spec);
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });
  writeModels(outDir);
  const services = [];
  for (const [tag, ops] of opsByTag.entries()) {
    const s = writeService(tag, ops, outDir, args.style);
    services.push(s);
  }
  writeIndex(services, outDir, args.style);
  console.log(`Generated ${services.length} OpenAPI services into ${path.relative(rootDir, outDir)} (style=${args.style})`);
}

function firstJsonResponseSchema(op) {
  const responses = op.responses || {};
  const keys = Object.keys(responses);
  const okKey = keys.find((k) => /^2\d\d$/.test(k)) || keys.find((k) => k === 'default');
  if (!okKey) return undefined;
  const r = responses[okKey];
  const content = r && r.content;
  if (!content) return undefined;
  const appJson = content['application/json'] || content['text/json'] || content['application/*+json'];
  return appJson ? appJson.schema : undefined;
}

function firstJsonRequestSchema(op) {
  const rb = op.requestBody;
  const content = rb && rb.content;
  if (!content) return undefined;
  const appJson = content['application/json'] || content['text/json'] || content['application/*+json'];
  return appJson ? appJson.schema : undefined;
}

function getTypeAndCollect(schema, used, hint) {
  const r = __resolveType;
  if (!r) return 'unknown';
  if (isRef(schema)) {
    const name = pascalCase(refName(schema['$ref']));
    used.add(name);
    return name;
  }
  if (schema && schema.type === 'array' && isRef(schema.items)) {
    const name = pascalCase(refName(schema.items['$ref']));
    used.add(name);
    return `${name}[]`;
  }
  const t = r(schema, hint);
  if (/^[A-Z][A-Za-z0-9_]*$/.test(t)) {
    used.add(t);
  }
  return t;
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exit(1);
});
