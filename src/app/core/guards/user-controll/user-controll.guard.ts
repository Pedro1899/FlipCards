import { CanActivateFn } from '@angular/router';
import {LocalStorageService} from '../../services/storage/local-storage.service'
import { inject } from '@angular/core';
import {Router} from '@angular/router'

export const userControllGuard: CanActivateFn = async (route, state) => {
const storage = inject(LocalStorageService);
const router = inject(Router)
try {

  const getUser = await storage.get("User")
  const targetRoute = route.url.map(segment => segment.path).join('/');
  if(targetRoute =="login" || targetRoute =="register"){
    if(!getUser ){
      return true
    }
    await router.navigate(['Auth/language']);
    return false
  }
    if(!getUser ){
      await router.navigate(['Auth/login']);
      return false
    }
    return true
  
} catch (error) {
  return true
}

};
