import { CanActivateFn, Router } from '@angular/router';
import {LocalStorageService} from '../../services/storage/local-storage.service'
import { inject } from '@angular/core';

export const userLanguageGuard: CanActivateFn = async (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  try {
    const userInfo = await localStorageService.get('User');
    const language = await localStorageService.get('newLanguage');

    if (userInfo && language) {
      await router.navigate(['/dashboard']);
      return false; 
    }
    return true; 
  } catch (error) {
    return true; 
  }
};
