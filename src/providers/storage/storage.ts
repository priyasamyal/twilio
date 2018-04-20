
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  setUser(data){
    this.storage.set('user',data);
  }

  getUser(){
    return this.storage.get('user');
   }

   removeUser(){
     console.log("remove")
     return this.storage.remove('user');
   }
}
