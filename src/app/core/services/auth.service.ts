import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../types/user.type";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthResponse } from "../types/auth.response.type";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private http = inject(HttpClient);
    private router = inject(Router);

    private readonly API_URL = 'http://localhost:3000/api/auth';
    private readonly TOKEN_KEY = 'access_token';
    private readonly USER_KEY = 'user';

    private getTokenFromStorage(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private getUserFromStorage(): User | null {
    if (typeof window !== 'undefined') {
      const userJson = localStorage.getItem(this.USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.tokenSignal.set(token);
    this.currentUserSignal.set(user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.tokenSignal.set(null);
    this.currentUserSignal.set(null);
  }

  private initializeAuth(): void {
    // Auth is already initialized via signal defaults
    // This method is here for any additional initialization logic
  }

  constructor() {
    this.initializeAuth();
  }

  // signals for reactive state
  private currentUserSignal = signal<User | null>(this.getUserFromStorage());
  private tokenSignal = signal<string | null>(this.getTokenFromStorage());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly token = this.tokenSignal.asReadonly();
  
  // Computed signals
  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly isDriver = computed(() => {
    // Add role check if your user object has role info
    return this.currentUserSignal() !== null;
  });

  register(name: string, email: string, address: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/customer/register`, {
        name,
        email,
        address,
        password
    }).pipe(
        tap(response => {
            if(response.success) {
                this.setAuth(response.data.access_token, response.data.user)
            }
        }),
        catchError(error => {
            console.error('Registration error: ', error);
            return throwError(() => error);
        })
    )
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/customer/login`, {
        email,
        password
    }).pipe(
        tap(response => {
            if(response.success) {
                this.setAuth(response.data.access_token, response.data.user)
            }
        }),
        catchError(error => {
            console.error('Login error: ', error);
            return throwError(() => error);
        })
    )
  }

  // Driver Authentication
  registerDriver(name: string, email: string, phone: string, password: string, vehicle_type: string, profile_image_url?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/driver/register`, {
        name,
        email,
        phone,
        password,
        vehicle_type,
        profile_image_url
    }).pipe(
        tap(response => {
            if(response.success) {
                this.setAuth(response.data.access_token, response.data.user)
            }
        }),
        catchError(error => {
            console.error('Driver registration error: ', error);
            return throwError(() => error);
        })
    )
  }

  loginDriver(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/driver/login`, {
        email,
        password
    }).pipe(
        tap(response => {
            if(response.success) {
                this.setAuth(response.data.access_token, response.data.user)
            }
        }),
        catchError(error => {
            console.error('Driver login error: ', error);
            return throwError(() => error);
        })
    )
  }

  // Admin Authentication
  registerAdmin(name: string, email: string, password: string, address: string, profile_image_url?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/admin/register`, {
        name,
        email,
        password,
        address,
        profile_image_url
    }).pipe(
        tap(response => {
            if(response.success) {
                this.setAuth(response.data.access_token, response.data.user)
            }
        }),
        catchError(error => {
            console.error('Admin registration error: ', error);
            return throwError(() => error);
        })
    )
  }

  loginAdmin(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/admin/login`, {
        email,
        password
    }).pipe(
        tap(response => {
            if(response.success) {
                this.setAuth(response.data.access_token, response.data.user)
            }
        }),
        catchError(error => {
            console.error('Admin login error: ', error);
            return throwError(() => error);
        })
    )
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  getAuthToken(): string | null {
    return this.tokenSignal();
  }
 
}