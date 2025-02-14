import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/api'; // Ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  /** Busca todas as lojas (empresas) */
  getLojas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empresas`);
  }

  /** Registra um novo usuário */
  registrarUsuario(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/registrar`, userData);
  }
}
