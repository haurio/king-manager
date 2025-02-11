import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import necessário
import { provideToastr } from 'ngx-toastr'; // Importa o Toastr
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Configura as rotas
    importProvidersFrom(HttpClientModule), // Configura o HttpClient
    provideAnimations(), // Necessário para o Toastr funcionar corretamente
    provideToastr() // Adiciona o Toastr
  ],
};
