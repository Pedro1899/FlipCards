import { InjectionToken } from '@angular/core';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

export interface ApiConfig {
  appApiBaseUrl: string;
  aiApiBaseUrl: string;
  aiApiKey: string;
  aiModel: string;
}

export const apiConfig: ApiConfig = {
  appApiBaseUrl: 'http://localhost:8080',
  aiApiBaseUrl: 'https://api.aimlapi.com',
  aiApiKey: 'a3aa465d990441f6bb4e7069230ab15f',
  aiModel: 'google/gemma-3n-e4b-it'
};