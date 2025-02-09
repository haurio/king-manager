import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    console.log('Enviando dados para o backend:', { email, password }); // Log dos dados enviados

    // URL ajustada para o caminho correto do backend
    return this.http.post<any>('http://localhost:3000/api/auth/login', { email, password }).pipe(
      tap((response) => {
        console.log('Resposta do backend:', response); // Log da resposta recebida
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
