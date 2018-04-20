    import {Component }from '@angular/core'; 
    import {IonicPage, NavController, NavParams }from 'ionic-angular'; 
    import {ToastProvider}from '../../providers/toast/toast'; 
    import {UserProvider}from '../../providers/user/user'; 
    import {HomePage }from '../home/home'; 
    import { StorageProvider } from '../../providers/storage/storage';
    /**
     * Generated class for the LoginPage page.
     *
     * See https://ionicframework.com/docs/components/#navigation for more info on * Ionic pages and navigation. */

    @IonicPage()
    @Component( {
    selector:'page-login', 
    templateUrl:'login.html', 
    })
    export class LoginPage {

    user_credentials =  {
      username:'staff', 
      password:'admin' 
    }

    constructor(private storage: StorageProvider,public navCtrl:NavController, public navParams:NavParams, public toast:ToastProvider, public user:UserProvider) {
    }

    ionViewDidLoad() {
       console.log('ionViewDidLoad LoginPage'); 
    }
    onSignIn() {
        
        if (this.user_credentials.username == '') {
          this.toast.showToast("Please enter username "); 
        }
        else if (this.user_credentials.password == '') {
          this.toast.showToast("Please enter password "); 
        }
        else {
            this.user.login(this.user_credentials).subscribe(res =>  {
            if(res.status){
              this.user.user_info=res.data;
              this.storage.setUser(this.user.user_info);
              this.user.name=res.data.username;
              this.toast.showToast("Login Successfully");
              this.navCtrl.setRoot("ProfilePage");
             
            }else{
              this.toast.showToast(res.message);
            }
         }, err =>  {
              this.toast.showToast("Server not responding")
          })
        }
    }
  
  }
