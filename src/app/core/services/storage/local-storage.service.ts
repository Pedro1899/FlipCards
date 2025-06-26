import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubject = new BehaviorSubject<{[key: string]: any}>({});
  storage$ = this.storageSubject.asObservable();

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    await this.storage.create();
    const initialStorage = await this.storage.get('myStorage') || {};
    this.storageSubject.next(initialStorage);
  }

  async set(key: string, value: any) {
    const currentStorage = await this.storage.get('myStorage') || {};
    currentStorage[key] = value;
    await this.storage.set('myStorage', currentStorage);
    this.storageSubject.next(currentStorage);
  }

  async get(key: string) {
    const currentStorage = await this.storage.get('myStorage') || {};
    if (key in currentStorage) {
        return currentStorage[key];
    } else {
        return null; 
    }
  }

  async remove(key: string) {
    const currentStorage = await this.storage.get('myStorage') || {};
    delete currentStorage[key];
    await this.storage.set('myStorage', currentStorage);
    this.storageSubject.next(currentStorage);
  }

  async clear() {
    await this.storage.set('myStorage', {});
    this.storageSubject.next({});
  }
}
