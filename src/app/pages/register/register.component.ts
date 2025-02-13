import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service'; // Certifique-se da importação correta
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Certifique-se que o CommonModule está aqui
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  senhaConfirmada: string = '';
  telefone: string = '';
  cargo: string = '';
  loja: string = '';
  errorMessage: string = '';

  constructor(
    private registerService: RegisterService,  // Correto
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (this.senha !== this.senhaConfirmada) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      cargo: this.cargo,
      loja: this.loja
    };

    this.registerService.register(userData).subscribe(
      (response: any) => {  // Tipagem explícita para 'response'
        this.toastr.success('Usuário registrado com sucesso!', 'Sucesso');
        this.router.navigate(['/login']);  // Redireciona para a página de login após o registro
      },
      (error: any) => {  // Tipagem explícita para 'error'
        this.errorMessage = error.message || 'Erro ao registrar usuário.';
        this.toastr.error(this.errorMessage, 'Erro');
      }
    );
  }
}
