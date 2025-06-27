
import { CanActivateFn } from '@angular/router';
import {LocalStorageService} from '../../services/storage/local-storage.service'
import { inject } from '@angular/core';
import {Router} from '@angular/router'

export const notUserGuard: CanActivateFn = async (route, state) => {
const storage = inject(LocalStorageService);
const router = inject(Router)
try {

  const getUser = await storage.get("User")
    if(!getUser ){
      await router.navigate(['Auth']);
      return false
    }
    return true
  
} catch (error) {
  return true
}

};
