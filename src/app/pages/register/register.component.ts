import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../services/empresa.service';
import { CargoService } from '../../services/cargo.service';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmpresaService, CargoService, RegisterService]
})
export class RegisterComponent implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  senhaConfirmada: string = '';
  telefone: string = '';
  cargo: string = ''; // Agora estamos armazenando o nome do cargo
  loja: string = ''; // Agora estamos armazenando o nome da loja (empresa)
  errorMessage: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  empresas: { empresa_id: string; nome_fantasia: string }[] = [];
  cargos: { cargo_id: string; nome_cargo: string }[] = [];

  private empresaService = inject(EmpresaService);
  private cargoService = inject(CargoService);
  private registerService = inject(RegisterService);

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
    this.errorMessage = ''; // Limpa mensagens anteriores

    // Verificando se todos os campos estão preenchidos corretamente
    if (!this.nome || !this.email || !this.senha || !this.senhaConfirmada || !this.telefone || !this.cargo || !this.loja) {
      this.errorMessage = 'Todos os campos são obrigatórios!';
      return;
    }

    // Verificando se as senhas coincidem
    if (this.senha !== this.senhaConfirmada) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    // Verificando a complexidade da senha
    if (this.senha.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(this.senha)) {
      this.errorMessage = 'A senha deve ter pelo menos 8 caracteres e um caractere especial.';
      return;
    }

    // Agora estamos enviando os nomes dos cargos e lojas, ao invés dos IDs
    const userData = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      cargo: this.cargo,  // Enviando o nome do cargo
      loja: this.loja  // Enviando o nome da loja
    };

    console.log('Enviando dados para o backend:', userData);

    // Enviando os dados para o backend
    this.registerService.registrarUsuario(userData).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso:', response);
        alert('Cadastro realizado com sucesso!');
        this.limparCampos();
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
        this.errorMessage = error.error?.error || 'Erro ao registrar o usuário. Tente novamente mais tarde.';
      }
    });
  }

  limparCampos(): void {
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.senhaConfirmada = '';
    this.telefone = '';
    this.cargo = '';  // Limpando o nome do cargo
    this.loja = '';  // Limpando o nome da loja
    this.errorMessage = '';
  }
}
