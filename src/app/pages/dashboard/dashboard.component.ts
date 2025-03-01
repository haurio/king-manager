import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Caminho correto
import { SidebarComponent } from '../../layout/sidebar/sidebar.component'; // Caminho correto

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent], // Incluindo SidebarComponent nas imports
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  selectedTab = { id: 'dashboard' }; // Aba inicial selecionada
  hoveredTab: string | null = null; // Aba atualmente em hover
  isCollapsed = false; // Estado da sidebar (colapsada ou expandida)

  // Referências para os elementos do DOM
  @ViewChild('navigation', { static: false }) navigation!: ElementRef;
  @ViewChild('main', { static: false }) main!: ElementRef;
  @ViewChild('toggle', { static: false }) toggle!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  // Ciclo de vida do Angular - Após a visualização ser inicializada
  ngAfterViewInit() {
    this.addToggleEffect();
  }

  // Método para selecionar uma aba
  selectTab(tab: any) {
    this.selectedTab = tab;

    // Se o botão 'Log out' for clicado, faz o logout
    if (tab.id === 'logout') {
      this.logout();
    }
  }

  // Método para alterar a aba em hover
  hoverTab(tabId: string) {
    this.hoveredTab = tabId;
    this.selectedTab = { id: tabId };
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

  // Método para realizar o logout
  private logout() {
    this.authService.logout(); // Adapte conforme o método de logout no seu AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
