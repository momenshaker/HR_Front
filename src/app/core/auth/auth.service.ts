import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthApiService } from '../../api/auth/auth.api';

interface StoredAuthState {
  token: string | null;
  user: AuthenticatedUser | null;
}

export interface AuthenticatedUser {
  id: number;
  name: string;
  roles: string[];
}

const STORAGE_KEY = 'hr-platform-auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApiService);

  private readonly stateSignal = signal<StoredAuthState>(this.loadInitialState());

  readonly token = computed(() => this.stateSignal().token);
  readonly user = computed(() => this.stateSignal().user);
  readonly isAuthenticated = computed(() => Boolean(this.stateSignal().token));

  login(email: string, password: string) {
    return this.authApi.login({ body: { email, password } }).pipe(
      tap((response) => {
        const newState: StoredAuthState = {
          token: response.token,
          user: response.user
        };
        this.stateSignal.set(newState);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      })
    );
  }

  logout(): void {
    this.stateSignal.set({ token: null, user: null });
    localStorage.removeItem(STORAGE_KEY);
    void this.router.navigate(['/login']);
  }

  private loadInitialState(): StoredAuthState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { token: null, user: null };
    }
    try {
      const parsed = JSON.parse(stored) as StoredAuthState;
      return parsed;
    } catch {
      return { token: null, user: null };
    }
  }
}
