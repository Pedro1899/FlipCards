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
      return false; // Block access to inicial-page
    }
    return true; // Allow access
  } catch (error) {
    // Optionally redirect to an error page or allow access
    return true; // Fallback to allow access (adjust based on requirements)
  }
};
