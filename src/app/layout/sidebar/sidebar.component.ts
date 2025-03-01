import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  // Certifique-se de importar corretamente
import { RouterModule } from '@angular/router';  // Caso utilize navegação, pode ser necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agora está importando CommonModule e RouterModule
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() tabs: any[] = []; // Recebe as abas
  @Input() selectedTab: any; // Recebe a aba selecionada
  @Input() hoveredTab: string | null = null; // Recebe a aba em hover
  @Output() tabSelected = new EventEmitter<any>(); // Emite quando uma aba é selecionada

  // Método para selecionar uma aba
  selectTab(tab: any) {
    this.tabSelected.emit(tab); // Emite a aba selecionada para o componente pai
  }

  // Método para alterar a aba em hover
  hoverTab(tabId: string) {
    this.hoveredTab = tabId;
  }
}
