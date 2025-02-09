import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';  // Corrigir o nome da importação

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Configura as rotas
    importProvidersFrom(HttpClientModule), // Configura o HttpClient
  ],
};
