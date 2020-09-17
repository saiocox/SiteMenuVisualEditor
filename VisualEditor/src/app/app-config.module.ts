import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  apiEndpoint: string;
  websiteBase: string;
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:8000/api/',
  websiteBase: 'http://localhost:8000/'
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
