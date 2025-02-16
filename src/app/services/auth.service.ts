import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth/login';  // URL da API de login

  constructor(private http: HttpClient) { }

  // Método para fazer login
  login(email: string, senha: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(this.apiUrl, { email, senha }, { headers });
  }

  // Método para verificar se o usuário está logado (checa se o token está presente no localStorage)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;  // Retorna true se o token estiver presente
  }

  // Método para fazer logout (remove o token do localStorage)
  logout(): void {
    localStorage.removeItem('authToken');
  }

  // Método para salvar o token (pode ser utilizado ao fazer login com sucesso)
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
