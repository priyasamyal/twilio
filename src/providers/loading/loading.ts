import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LoadingProvider {
  request_timeout = 30000;
  loading: any;
	isLoading:boolean;
  constructor(
    public loadingCtrl: LoadingController,
		public platform: Platform,
  ) {
    console.log('Hello LoadingProvider Provider');
  }
  showLoading(content:string = null) {
		if(!this.isLoading){
			this.isLoading = true;
			this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
				content: content
			});
			this.loading.onDidDismiss(() => {
				this.isLoading = false
			});
			this.loading.present();
			setTimeout(() => { this.hideLoading() }, this.request_timeout);
		
		}
  }
  hideLoading() { if(this.isLoading) this.loading.dismiss(); }

}
