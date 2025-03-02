import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmpresaLogadaService } from '../../services/empresa-logada.service';
import { AuthService } from '../../services/auth.service';
import { EmpresaService } from '../../services/empresa.service'; // Importando o serviço para buscar as empresas

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() selectedTab: any;
  @Input() hoveredTab: string | null = null;
  @Output() tabSelected = new EventEmitter<any>(); // Evento emitido para o DashboardComponent

  empresaNome: string = ''; // Variável para armazenar o nome da empresa
  isPopupVisible: boolean = false; // Controle do popup
  outrasEmpresas: any[] = []; // Lista de empresas que será carregada dinamicamente

  tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'perfil', label: 'Perfil', icon: 'user' },
    { id: 'transacoes-cielo', label: 'Transações Cielo', icon: 'credit-card' },
    { id: 'relatorios', label: 'Relatórios', icon: 'chart-bar' },
    { id: 'despesas', label: 'Despesas', icon: 'wallet' },
    { id: 'transacoes', label: 'Transações Diárias', icon: 'exchange-alt' },
    { id: 'configuracao', label: 'Configurações', icon: 'cogs' },
    { id: 'resumo-financeiro', label: 'Resumo Financeiro', icon: 'chart-line' },
    { id: 'logout', label: 'Log out', icon: 'sign-out-alt' }
  ];

  constructor(
    private empresaLogadaService: EmpresaLogadaService,
    private authService: AuthService,
    private empresaService: EmpresaService // Injetando o serviço para buscar as empresas
  ) {}

  ngOnInit(): void {
    this.authService.getUserEmail().subscribe((email) => {
      if (email) {
        this.empresaLogadaService.getEmpresaLogada(email).subscribe((response) => {
          if (response && response.loja) {
            this.empresaNome = response.loja; // Obtendo a empresa logada
          }
        });

        // Buscando todas as empresas
        this.empresaService.getLojas().subscribe((empresas: any[]) => {
          // Agora mapeando para garantir que estamos buscando a propriedade 'nome_fantasia' corretamente
          this.outrasEmpresas = empresas.map((empresa) => ({
            empresa_id: empresa.empresa_id,
            nome_fantasia: empresa.nome_fantasia // Garantindo que estamos acessando a propriedade correta
          }));
        });
      }
    });
  }

  selectTab(tab: any) {
    this.tabSelected.emit(tab);
  }

  hoverTab(tabId: string) {
    this.hoveredTab = tabId;
  }

  // Função para abrir o popup
  showCompanyPopupMethod() {
    this.isPopupVisible = true;
  }

  // Função para fechar o popup
  closePopup() {
    this.isPopupVisible = false;
  }

  // Função para hover nas empresas
  hoverEmpresa(empresa: string) {
    // Animação pode ser aplicada aqui se necessário
  }

  resetEmpresaHover() {
    // Reseta qualquer estilo de hover, se necessário
  }
}
