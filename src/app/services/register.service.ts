import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Isso garante que o serviço esteja disponível globalmente
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/api/auth/register'; // URL da API de registro

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
