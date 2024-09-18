import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();
  private currentUserSubject = new BehaviorSubject<any>(null);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  private initializeAuth() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.tokenSubject.next(token);
      this.getUser().subscribe(user => {
        this.currentUserSubject.next(user);
        this.setUserRole(user.role);
      });
    }
  }

  setUserData(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      role
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.tokenSubject.next(response.access_token);
        localStorage.setItem('access_token', response.access_token);
        this.getUser().subscribe(user => {
          this.currentUserSubject.next(user);
          this.setUserRole(user.role);
        });
      })
    );
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post<any>(`${this.apiUrl}/logout`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      tap(() => {
        this.tokenSubject.next(null);
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);
        this.userRoleSubject.next(null);
      })
    );
  }

  updateProfile(name: string, password: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.put<any>(`${this.apiUrl}/user`, { name, password }, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('access_token');
    // console.log('Token:', token); // Ajoutez ce log pour vérifier la présence du token
    return this.http.get<any>(`${this.apiUrl}/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }


  setUserRole(role: string) {
    this.userRoleSubject.next(role);
  }

  isAuthenticated(): Observable<boolean> {
    return this.token$.pipe(
      map(token => !!token)
    );
  }

  getUserRole(): Observable<string | null> {
    return this.userRole$;
  }
}
