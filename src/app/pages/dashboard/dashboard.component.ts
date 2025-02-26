import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  selectedTab = { id: 'dashboard' }; // Aba inicial selecionada
  hoveredTab: string | null = null;  // Armazena a aba atualmente em hover
  isCollapsed = false; // Estado da sidebar (colapsada ou expandida)

  // Referências para os elementos do DOM
  @ViewChild('navigation', { static: false }) navigation!: ElementRef;
  @ViewChild('main', { static: false }) main!: ElementRef;
  @ViewChild('toggle', { static: false }) toggle!: ElementRef;

  // Definindo as abas de navegação com ícones e rótulos
  tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'perfil', label: 'Perfil', icon: 'user' },
    { id: 'transacoes-cielo', label: 'Transações Cielo', icon: 'credit-card' },
    { id: 'relatorios', label: 'Relatórios', icon: 'chart-bar' },
    { id: 'despesas', label: 'Despesas', icon: 'wallet' },
    { id: 'transacoes', label: 'Transações Diárias', icon: 'exchange-alt' },
    { id: 'configuracao', label: 'Configurações', icon: 'cogs' },
    { id: 'resumo-financeiro', label: 'Resumo Financeiro', icon: 'chart-line' }

  ];


  // Ciclo de vida do Angular - Após a visualização ser inicializada
  ngAfterViewInit() {
    this.addToggleEffect();
  }

  // Método para selecionar uma aba
  selectTab(tab: any) {
    this.selectedTab = tab;
  }

  // Método para alterar a aba em hover
  hoverTab(tabId: string) {
    this.hoveredTab = tabId;
    this.selectedTab = this.tabs.find(tab => tab.id === tabId) || this.selectedTab;
  }

  // Método para alternar o estado de colapso da sidebar
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Método que adiciona o efeito de alternância da sidebar
  private addToggleEffect() {
    this.toggle.nativeElement.addEventListener('click', () => {
      this.navigation.nativeElement.classList.toggle('active');
      this.main.nativeElement.classList.toggle('active');
    });
  }
}
