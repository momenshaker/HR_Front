import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const collectionPath = path.join(rootDir, 'src', 'assets', 'api', 'hr-platform.postman_collection.json');
const outputDir = path.join(rootDir, 'src', 'app', 'api');

function readCollection() {
  if (!fs.existsSync(collectionPath)) {
    throw new Error(`Postman collection not found at ${collectionPath}`);
  }
  const raw = fs.readFileSync(collectionPath, 'utf-8');
  return JSON.parse(raw);
}

function ensureCleanOutput() {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outputDir, { recursive: true });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function pascalCase(value) {
  return value
    .replace(/([\W_]+)/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

function camelCase(value) {
  const parts = pascalCase(value);
  return parts.charAt(0).toLowerCase() + parts.slice(1);
}

function normalizePath(raw) {
  const withoutBase = raw.replace(/\{\{baseUrl\}\}/g, '');
  const [pathname] = withoutBase.split('?');
  return pathname || withoutBase;
}

function extractPathParams(pathValue) {
  const matches = pathValue.match(/:[^/]+/g);
  if (!matches) {
    return [];
  }
  return matches.map((match) => match.substring(1));
}

function generateZodFromSample(sample, indent = 0) {
  const padding = '  '.repeat(indent);
  if (sample === null) {
    return 'z.null()';
  }
  if (Array.isArray(sample)) {
    if (sample.length === 0) {
      return 'z.array(z.unknown())';
    }
    return `z.array(${generateZodFromSample(sample[0], indent)})`;
  }
  switch (typeof sample) {
    case 'string': {
      if (/^[A-Z_]+$/.test(sample)) {
        return `z.enum(['${sample}'])`;
      }
      if (/^\d{4}-\d{2}-\d{2}/.test(sample)) {
        return 'z.string().datetime({ offset: true }).or(z.string())';
      }
      return 'z.string()';
    }
    case 'number':
      return Number.isInteger(sample) ? 'z.number().int()' : 'z.number()';
    case 'boolean':
      return 'z.boolean()';
    case 'object': {
      const entries = Object.entries(sample);
      if (entries.length === 0) {
        return 'z.record(z.unknown())';
      }
      const inner = entries
        .map(([key, value]) => `${padding}  ${JSON.stringify(key)}: ${generateZodFromSample(value, indent + 1)}`)
        .join(',\n');
      return `z.object({\n${inner}\n${padding}})`;
    }
    default:
      return 'z.unknown()';
  }
}

function renderTypeAlias(name, schemaName) {
  return `export type ${name} = z.infer<typeof ${schemaName}>;`;
}

function renderOptionsType(name, pieces) {
  const lines = ['export interface ' + name + ' {'];
  if (pieces.path && pieces.path.length > 0) {
    lines.push('  pathParams: {');
    pieces.path.forEach((param) => {
      lines.push(`    ${param}: string | number;`);
    });
    lines.push('  };');
  } else {
    lines.push('  pathParams?: undefined;');
  }
  if (pieces.query && pieces.query.length > 0) {
    lines.push('  query?: {');
    pieces.query.forEach((param) => {
      lines.push(`    ${param}?: string | number | boolean;`);
    });
    lines.push('  };');
  } else {
    lines.push('  query?: undefined;');
  }
  if (pieces.bodyType) {
    lines.push(`  body?: ${pieces.bodyType};`);
  } else {
    lines.push('  body?: undefined;');
  }
  lines.push('  headers?: Record<string, string>;');
  lines.push('}');
  return lines.join('\n');
}

function writeFolderApi(folder, folderSlug) {
  const className = `${pascalCase(folder.name)}ApiService`;
  const relativeCorePath = path.relative(path.join('src', 'app', 'api', folderSlug), path.join('src', 'app', 'core'));
  const importPath = path.join(relativeCorePath, 'http', 'api-client.service').replace(/\\/g, '/');
  const fileDir = path.join(outputDir, folderSlug);
  fs.mkdirSync(fileDir, { recursive: true });
  const lines = [];
  lines.push('/* eslint-disable */');
  lines.push('/* Auto-generated from Postman collection. Do not edit manually. */');
  lines.push("import { inject, Injectable } from '@angular/core';");
  lines.push("import { Observable } from 'rxjs';");
  lines.push("import { ApiClient } from '" + importPath + "';");
  lines.push("import { z } from 'zod';");
  lines.push('');

  const exports = [];
  const methodLines = [];

  for (const item of folder.item || []) {
    if (!item.request) {
      continue;
    }
    const methodName = camelCase(item.name);
    const pascalName = pascalCase(item.name);
    const method = item.request.method || 'GET';
    const rawUrl = item.request.url?.raw ?? '';
    const pathValue = normalizePath(rawUrl);
    const pathParams = extractPathParams(pathValue);
    const queryParams = item.request.url?.query?.map((q) => q.key).filter(Boolean) ?? [];
    const headerEntries = (item.request.header ?? [])
      .filter((header) => !!header && header.disabled !== true && header.key && header.value)
      .map((header) => ({ key: header.key, value: header.value }));

    const requestBodyRaw = item.request.body?.raw;
    let requestSchemaName;
    let requestTypeName;
    if (requestBodyRaw) {
      try {
        const parsed = JSON.parse(requestBodyRaw);
        requestSchemaName = `${pascalName}RequestSchema`;
        const schema = generateZodFromSample(parsed, 1);
        lines.push(`const ${requestSchemaName} = ${schema};`);
        requestTypeName = `${pascalName}Request`;
        lines.push(renderTypeAlias(requestTypeName, requestSchemaName));
        lines.push('');
      } catch {
        // ignore invalid JSON
      }
    }

    const response = Array.isArray(item.response) && item.response.length > 0 ? item.response[0] : undefined;
    let responseSchemaName;
    let responseTypeName = 'unknown';
    if (response?.body) {
      try {
        const parsedResponse = JSON.parse(response.body);
        responseSchemaName = `${pascalName}ResponseSchema`;
        const schema = generateZodFromSample(parsedResponse, 1);
        lines.push(`const ${responseSchemaName} = ${schema};`);
        responseTypeName = `${pascalName}Response`;
        lines.push(renderTypeAlias(responseTypeName, responseSchemaName));
        lines.push('');
      } catch {
        responseTypeName = 'unknown';
      }
    }

    const optionsTypeName = `${pascalName}Options`;
    const optionsType = renderOptionsType(optionsTypeName, {
      path: pathParams.length > 0 ? pathParams : null,
      query: queryParams,
      bodyType: requestTypeName
    });
    lines.push(optionsType);
    lines.push('');

    const methodLineParts = [];
    const defaultClause = pathParams.length > 0 ? '' : ' = {}';
    methodLineParts.push(`${methodName}(options: ${optionsTypeName}${defaultClause}): Observable<${responseTypeName}> {`);
    methodLineParts.push(
      `  return this.client.request<${responseTypeName}${requestTypeName ? `, ${requestTypeName}` : ''}>('${method}', '${pathValue}', {`);
    if (pathParams.length > 0) {
      methodLineParts.push('    pathParams: options.pathParams,');
    }
    if (queryParams.length > 0) {
      methodLineParts.push('    queryParams: options.query,');
    }
    if (requestTypeName) {
      methodLineParts.push('    body: options.body,');
    }
    if (responseSchemaName) {
      methodLineParts.push(`    responseSchema: ${responseSchemaName},`);
    }
    if (headerEntries.length > 0) {
      methodLineParts.push('    headers: {');
      methodLineParts.push('      ...(options.headers ?? {}),');
      headerEntries.forEach((header) => {
        methodLineParts.push(`      ${JSON.stringify(header.key)}: ${JSON.stringify(header.value)},`);
      });
      methodLineParts.push('    },');
    } else {
      methodLineParts.push('    headers: options.headers,');
    }
    methodLineParts.push('  });');
    methodLineParts.push('}');

    methodLines.push(methodLineParts.join('\n'));
    exports.push(methodName);
  }

  lines.push(`@Injectable({ providedIn: 'root' })`);
  lines.push(`export class ${className} {`);
  lines.push('  private readonly client = inject(ApiClient);');
  lines.push('');
  lines.push(...methodLines.map((block) => '  ' + block.replace(/\n/g, '\n  ')));
  lines.push('}');

  fs.writeFileSync(path.join(fileDir, `${folderSlug}.api.ts`), lines.join('\n'));
}

function generateIndex(folders) {
  const exports = folders
    .map((folder) => {
      const folderSlug = slugify(folder.name);
      const className = `${pascalCase(folder.name)}ApiService`;
      return `export { ${className} } from './${folderSlug}/${folderSlug}.api';`;
    })
    .join('\n');
  fs.writeFileSync(path.join(outputDir, 'index.ts'), `${exports}\n`);
}

function main() {
  const collection = readCollection();
  const folders = collection.item ?? [];
  ensureCleanOutput();
  for (const folder of folders) {
    const slug = slugify(folder.name);
    writeFolderApi(folder, slug);
  }
  generateIndex(folders);
}

main();
