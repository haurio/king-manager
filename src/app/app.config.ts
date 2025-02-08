import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // ✅ Importando corretamente

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
