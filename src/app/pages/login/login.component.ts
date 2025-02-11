import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importando FormsModule
import { CommonModule } from '@angular/common';  // Importando CommonModule
import { ToastrService } from 'ngx-toastr';  // Importando ToastrService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Importando CommonModule para o *ngIf funcionar
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  currentYear: number = new Date().getFullYear();  // Ano atual
  username: string = '';  // Variável para armazenar o nome de usuário
  password: string = '';  // Variável para armazenar a senha
  errorMessage: string = '';  // Variável para armazenar a mensagem de erro

  constructor(
    private authService: AuthService,  // Serviço de autenticação
    private router: Router,  // Serviço de roteamento
    private toastr: ToastrService  // Serviço de notificações
  ) {}

  onSubmit(): void {
    this.errorMessage = '';  // Limpa a mensagem de erro anterior

    // Chama o serviço de login, passando as credenciais
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login bem-sucedido', response);
        this.toastr.success('Login realizado com sucesso!', 'Sucesso');  // Exibe uma notificação de sucesso
        this.router.navigate(['/dashboard']);  // Redireciona para o dashboard após login
      },
      (error) => {
        console.error('Erro no login', error);
        this.errorMessage = error.message || 'Usuário ou senha inválidos.';
        this.toastr.error(this.errorMessage, 'Erro');  // Exibe uma notificação de erro
      }
    );
  }
}
