import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;  // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']);  // Redireciona para o login se o token não estiver presente
      return false;  // Bloqueia o acesso à rota
    }
  }
}
