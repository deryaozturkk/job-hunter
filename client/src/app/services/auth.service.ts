import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Temel URL'i merkezileştirdik
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // apiUrl kullanarak /auth/login'e gidiyoruz
    return this.http.post(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((res: any) => {
        if (res && res.data && res.data.access_token) {
          localStorage.setItem('job_hunter_token', res.data.access_token);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    // apiUrl kullanarak /users'a (kayıt) gidiyoruz
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  updateUser(userId: number, data: any): Observable<any> {
    // apiUrl kullanarak belirli bir user'ı güncelliyoruz
    return this.http.patch(`${this.apiUrl}/users/${userId}`, data);
  }

  getToken() {
    return localStorage.getItem('job_hunter_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('job_hunter_token');
  }

  public decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  getUserInitials(): string {
    const token = this.getToken();
    if (!token) return '';

    const decoded = this.decodeToken(token);
    const fullName = decoded?.fullName || ''; 

    if (!fullName) return '';

    return fullName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2); 
  }
}