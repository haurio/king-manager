import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Configura as rotas
    importProvidersFrom(HttpClientModule), // Configura o HttpClient para requisições HTTP
    provideAnimations(), // Necessário para Toastr funcionar
    provideToastr() // Configuração do Toastr
  ]
};
