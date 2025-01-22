import { CanActivateFn, Router } from '@angular/router';
import {LocalStorageService} from './services/storage/local-storage.service'
import { inject } from '@angular/core';


export const welcomeGuardGuard: CanActivateFn = async (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);

  // Await the result of the asynchronous `get` method
  const userInfo = await localStorageService.get('userInfo');
  
  if (userInfo) {

    router.navigate(['/career-mode']);
    return false; 
  }

  return true; 
};
