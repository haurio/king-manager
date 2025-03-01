import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';  // 'of' é utilizado para criar um Observable a partir de um valor

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
    localStorage.removeItem('email');  // Remove também o email do localStorage
  }

  // Método para salvar o token e o email no localStorage
  saveToken(token: string, email: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('email', email);  // Salva o email
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para obter o email do usuário logado
  getUserEmail(): Observable<string> {
    const email = localStorage.getItem('email');
    // Usando 'of' do RxJS para retornar o email diretamente como um Observable
    return email ? of(email) : new Observable<string>((observer) => observer.error('Email não encontrado'));
  }
}
