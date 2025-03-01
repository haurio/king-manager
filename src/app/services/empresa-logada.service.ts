import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaLogadaService {
  private apiUrl = 'http://localhost:3000/api/empresa-logada';  // URL para sua API backend

  constructor(private http: HttpClient) {}

  // Método para obter a empresa do usuário autenticado
  getEmpresaLogada(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?email=${email}`);
  }
}
