import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';  // Importando FormsModule
import { CommonModule } from '@angular/common'; // Importando CommonModule

@Component({
  selector: 'app-login',
  standalone: true,  // Garantir que o componente é standalone
  imports: [FormsModule, CommonModule],  // Declarando os módulos necessários
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentYear: number = new Date().getFullYear();
  email: string = '';  // Alterado para 'email'
  senha: string = '';  // Alterado para 'senha'
  passwordVisible: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.authService.login(this.email, this.senha).subscribe(  // Enviando 'email' e 'senha'
      (response) => {
        // Salva o token no localStorage
        this.authService.saveToken(response.token);

        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
        this.router.navigate(['/dashboard']); // Redireciona para o Dashboard após login
      },
      (error) => {
        this.errorMessage = error.message || 'Usuário ou senha inválidos.';
        this.toastr.error(this.errorMessage, 'Erro');
      }
    );
  }
}
