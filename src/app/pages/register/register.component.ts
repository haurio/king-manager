import { Component, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmpresaService } from '../../services/empresa.service';
import { CargoService } from '../../services/cargo.service'; // Importando o serviço de cargos
import { RegisterService } from '../../services/register.service'; // Importando o serviço de registro

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmpresaService, CargoService, RegisterService] // Adicionando o RegisterService
})
export class RegisterComponent implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';
  senhaConfirmada: string = '';
  telefone: string = '';
  cargo: string = ''; // Agora com a string do cargo
  loja: string = ''; // Armazenando o ID da loja selecionada
  errorMessage: string = '';
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  lojas: { id: string; nome: string }[] = []; // Ajustando para corresponder à estrutura correta
  cargos: { id: string; nome: string }[] = []; // Armazenando os cargos

  private empresaService = inject(EmpresaService);
  private cargoService = inject(CargoService); // Injetando o CargoService
  private registerService = inject(RegisterService); // Injetando o RegisterService

  ngOnInit(): void {
    this.carregarLojas();
    this.carregarCargos(); // Carregar os cargos
  }

  /** Carrega os dados das lojas */
  carregarLojas(): void {
    this.empresaService.getLojas().subscribe(
      (data: any) => {
        console.log('Dados recebidos das lojas:', data); // Verifique se os dados estão corretos
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

  /** Carrega os dados dos cargos */
  carregarCargos(): void {
    this.cargoService.getCargos().subscribe(
      (data: any) => {
        console.log('Dados recebidos dos cargos:', data); // Verifique se os dados estão corretos
        this.cargos = data.map((cargo: any) => ({
          id: cargo.cargo_id,
          nome: cargo.nome_cargo
        }));
      },
      (error) => {
        console.error('Erro ao carregar cargos:', error);
        this.errorMessage = 'Erro ao carregar cargos.';
      }
    );
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }

  /** Submete o formulário */
  onSubmit(): void {
    if (this.senha !== this.senhaConfirmada) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    if (this.senha.length < 8) {
      this.errorMessage = 'Senha necessita de conter pelo menos 8 caracteres.';
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

    this.registerService.registrarUsuario(userData).subscribe(
      (response) => {
        console.log('Usuário registrado com sucesso:', response);
        // Adicionar lógica de sucesso (ex.: limpar campos ou redirecionar)
      },
      (error) => {
        console.error('Erro ao registrar usuário:', error);
        this.errorMessage = 'Erro ao registrar o usuário. Tente novamente mais tarde.';
      }
    );
  }
}
