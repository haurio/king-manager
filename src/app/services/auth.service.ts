import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { email, password }).pipe(
      tap((response) => {
        if (response.message === 'Login bem-sucedido') {
          // Salve os dados do usuário se necessário
          localStorage.setItem('user', JSON.stringify(response.user));
          this.loggedIn.next(true);
          this.toastr.success('Login realizado com sucesso!', 'Sucesso');
          this.router.navigate(['/dashboard']);
        }
      }),
      catchError((error) => {
        this.toastr.error(error.message || 'Usuário ou senha inválidos.', 'Erro');
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
