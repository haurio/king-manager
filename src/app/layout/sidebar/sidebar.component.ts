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
  @Input() tabs: any[] = [];
  @Input() selectedTab: any;
  @Input() hoveredTab: string | null = null;
  @Output() tabSelected = new EventEmitter<any>();

  empresaNome: string = ''; // Variável para armazenar o nome da empresa

  constructor(
    private empresaLogadaService: EmpresaLogadaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserEmail().subscribe((email) => {
      if (email) {
        this.empresaLogadaService.getEmpresaLogada(email).subscribe((response) => {
          if (response && response.loja) {
            this.empresaNome = response.loja; // Armazena o nome da empresa
            console.log('Nome da empresa:', this.empresaNome);  // Adiciona um log para depuração
          }
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
}
