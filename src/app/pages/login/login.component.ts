import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importe FormsModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // Marque como standalone
  imports: [FormsModule]  // Adicione FormsModule aqui
})
export class LoginComponent {
  currentYear: number = new Date().getFullYear();
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = ''; // Limpa a mensagem de erro anterior

    // Chama o serviço de login
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login bem-sucedido', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Erro no login', error);
        this.errorMessage = error.message || 'Usuário ou senha inválidos.';
      }
    );
  }
}
