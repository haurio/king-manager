import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../services/empresa.service';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    RecaptchaModule // Adicionando o RecaptchaModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmpresaService]
})
export class RegisterComponent implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  senhaConfirmada: string = '';
  telefone: string = '';
  cargo: string = '';
  loja: string = ''; // Armazena o ID da loja selecionada
  errorMessage: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  lojas: { id: string; nome: string }[] = []; // Ajustando para corresponder à estrutura correta
  responseRecaptcha: string | null = null; // Para armazenar a resposta do reCAPTCHA

  private empresaService = inject(EmpresaService);

  ngOnInit(): void {
    this.carregarLojas();
  }

  /** Carrega os dados das lojas */
  carregarLojas(): void {
    this.empresaService.getLojas().subscribe(
      (data: any) => {
        console.log('Dados recebidos:', data); // Verifique se os dados estão corretos
        this.lojas = data.map((empresa: any) => ({
          id: empresa.empresa_id,
          nome: empresa.nome_fantasia
        }));
      },
      (error) => {
        console.error('Erro ao carregar lojas:', error);
        this.errorMessage = 'Erro ao carregar lojas.';
      }
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  /** Função chamada quando o reCAPTCHA for resolvido */
  onCaptchaResolved(captchaResponse: string | null): void {
    this.responseRecaptcha = captchaResponse; // Agora aceita tanto 'string' quanto 'null'
  }

  /** Submete o formulário */
  onSubmit(): void {
    if (this.senha !== this.senhaConfirmada) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    if (!this.responseRecaptcha) {
      this.errorMessage = 'Você precisa verificar o reCAPTCHA!';
      return;
    }

    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      cargo: this.cargo,
      empresa_id: this.loja // Enviando o ID da loja selecionada
    };

    this.empresaService.registrarUsuario(userData).subscribe(
      (response) => {
        console.log('Usuário registrado com sucesso:', response);
      },
      (error) => {
        console.error('Erro ao registrar usuário:', error);
        this.errorMessage = 'Erro ao registrar o usuário. Tente novamente mais tarde.';
      }
    );
  }
}
