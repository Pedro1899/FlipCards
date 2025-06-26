import { CanActivateFn, Router } from '@angular/router';
import {LocalStorageService} from '../services/storage/local-storage.service'
import { inject } from '@angular/core';


export const welcomeGuardGuard: CanActivateFn = async (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  try {
    const userInfo = await localStorageService.get('User');
    const mainLang =localStorageService.get('mainLanguage');
    const langToLearn =localStorageService.get('langToLearn');
   
    
    if (userInfo ) {
      await router.navigate(['/career-mode']);
      return false; // Block access to inicial-page
    }
    return true; // Allow access
  } catch (error) {
    console.error('Error in welcomeGuard:', error);
    // Optionally redirect to an error page or allow access
    return true; // Fallback to allow access (adjust based on requirements)
  }

};
