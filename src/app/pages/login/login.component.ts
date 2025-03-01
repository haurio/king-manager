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

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  // Método para enviar o formulário de login
  onSubmit(): void {
    this.errorMessage = ''; // Limpa a mensagem de erro antes de uma nova tentativa de login
    this.authService.login(this.email, this.senha).subscribe(
      (response) => {
        // Salva o token no localStorage
        this.authService.saveToken(response.token, this.email); // Passando o email também

        this.toastr.success('Login realizado com sucesso!', 'Sucesso');
        this.router.navigate(['/dashboard']); // Redireciona para o Dashboard após login
      },
      (error) => {
        // Ajuste para capturar a mensagem correta de erro
        if (error.status === 400) {
          this.errorMessage = error.error?.error || 'Usuário ou senha inválidos.'; // Verifique o formato do erro
        } else if (error.status === 404) {
          this.errorMessage = error.error?.error || 'Usuário não encontrado.';
        } else {
          this.errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
        }

        this.toastr.error(this.errorMessage, 'Erro');
      }
    );
  }
}
