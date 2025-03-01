import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { CargoService } from '../../services/cargo.service';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr'; // Importação do ToastrService

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmpresaService, CargoService, RegisterService]
})
export class RegisterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  nome: string = '';
  email: string = '';
  senha: string = '';
  senhaConfirmada: string = '';
  telefone: string = '';
  cargo: string = '';
  loja: string = '';
  errorMessage: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  empresas: { empresa_id: string; nome_fantasia: string }[] = [];
  cargos: { cargo_id: string; nome_cargo: string }[] = [];

  private empresaService = inject(EmpresaService);
  private cargoService = inject(CargoService);
  private registerService = inject(RegisterService);
  private router = inject(Router);
  private toastr = inject(ToastrService); // Injeção do ToastrService

  ngOnInit(): void {
    this.carregarEmpresas();
    this.carregarCargos();
  }

  carregarEmpresas(): void {
    this.empresaService.getLojas().subscribe({
      next: (data: any) => {
        console.log('Empresas carregadas:', data);
        this.empresas = data.map((empresa: any) => ({
          empresa_id: empresa.empresa_id,
          nome_fantasia: empresa.nome_fantasia
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar empresas:', error);
        this.errorMessage = 'Erro ao carregar empresas.';
      }
    });
  }

  carregarCargos(): void {
    this.cargoService.getCargos().subscribe({
      next: (data: any) => {
        console.log('Cargos carregados:', data);
        this.cargos = data.map((cargo: any) => ({
          cargo_id: cargo.cargo_id,
          nome_cargo: cargo.nome_cargo
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar cargos:', error);
        this.errorMessage = 'Erro ao carregar cargos.';
      }
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.nome || !this.email || !this.senha || !this.senhaConfirmada || !this.telefone || !this.cargo || !this.loja) {
      this.toastr.error('Todos os campos são obrigatórios!', 'Erro no cadastro');
      return;
    }

    if (this.senha !== this.senhaConfirmada) {
      this.toastr.error('As senhas não coincidem!', 'Erro no cadastro');
      return;
    }

    if (this.senha.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(this.senha)) {
      this.toastr.error('A senha deve ter pelo menos 8 caracteres e um caractere especial.', 'Erro no cadastro');
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

    console.log('Enviando dados para o backend:', userData);

    this.registerService.registrarUsuario(userData).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso:', response);
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
        this.limparCampos();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        this.toastr.error(error.error?.error || 'Erro ao registrar o usuário. Tente novamente mais tarde.', 'Erro');
      }
    });
  }

  limparCampos(): void {
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.senhaConfirmada = '';
    this.telefone = '';
    this.cargo = '';
    this.loja = '';
    this.errorMessage = '';
  }
}
