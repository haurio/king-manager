import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = 'http://localhost:3000/api'; // Ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  /** Busca todos os cargos */
  getCargos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cargos`);  // Ajuste a URL conforme a rota do seu backend
  }

  /** Registra um novo cargo */
  registrarCargo(cargoData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cargos/registrar`, cargoData);  // Ajuste a URL conforme a rota do seu backend
  }
}
