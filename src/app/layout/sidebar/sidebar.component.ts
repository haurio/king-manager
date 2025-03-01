import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EmpresaLogadaService } from '../../services/empresa-logada.service';
import { AuthService } from '../../services/auth.service';

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

  // Definição das tabs diretamente no SidebarComponent
  tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'perfil', label: 'Perfil', icon: 'user' },
    { id: 'transacoes-cielo', label: 'Transações Cielo', icon: 'credit-card' },
    { id: 'relatorios', label: 'Relatórios', icon: 'chart-bar' },
    { id: 'despesas', label: 'Despesas', icon: 'wallet' },
    { id: 'transacoes', label: 'Transações Diárias', icon: 'exchange-alt' },
    { id: 'configuracao', label: 'Configurações', icon: 'cogs' },
    { id: 'resumo-financeiro', label: 'Resumo Financeiro', icon: 'chart-line' },
    { id: 'logout', label: 'Log out', icon: 'sign-out-alt' } // Adicionando Logout
  ];

  constructor(
    private empresaLogadaService: EmpresaLogadaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Carrega o nome da empresa assim que o usuário for autenticado
    this.authService.getUserEmail().subscribe((email) => {
      if (email) {
        this.empresaLogadaService.getEmpresaLogada(email).subscribe((response) => {
          if (response && response.loja) {
            this.empresaNome = response.loja; // Armazena o nome da empresa
            console.log('Nome da empresa:', this.empresaNome);  // Log para depuração
          }
        });
      }
    });
  }

  // Método para selecionar uma aba
  selectTab(tab: any) {
    this.tabSelected.emit(tab); // Emite o evento de seleção da aba
  }

  // Método para alterar a aba em hover
  hoverTab(tabId: string) {
    this.hoveredTab = tabId;
  }
}
