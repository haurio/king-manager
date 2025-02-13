import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component'; // Verifique se o caminho está correto
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },  // Corrigido para 'registrar' (não 'register')
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
