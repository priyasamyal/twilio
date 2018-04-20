import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { Diagnostic } from '@ionic-native/diagnostic';

export interface PageInterface {
  title: string;
  name: string;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
rootPage:any="TwiliotestPage";
 // rootPage:any;
  menuPages: PageInterface[] = [
    { title: 'My Profile', name: 'ProfilePage', icon: 'person' },
    { title: 'Groups', name: 'HomePage',  icon: 'people' },
    { title: 'Search', name: 'SearchPage',  icon: 'search' },
    { title: 'Logout', name: 'LoginPage',   icon: 'log-out' },
   ];
  constructor(private diagnostic: Diagnostic,private storage: StorageProvider,private user :UserProvider,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
       
    });
    //this.checkLogin();
    this.checkPermission();
  }
    checkLogin(){
     
      this.storage.getUser().then(res=>{
          if(res==null){
            this.rootPage="LoginPage"
          }else{
            console.log(res.username,"oo")
            this.user.user_info=res;
            this.user.name=res.username;
            this.rootPage="ProfilePage";
          }
    });
  }

  openPage(page: PageInterface){
      if(page.title=='Logout'){
        this.storage.removeUser().then(res=>{
          this.nav.setRoot("LoginPage");
        });
     }else{
          this.nav.setRoot(page.name);
     }
  }

  checkPermission(){
    console.log("check Permission")
    this.diagnostic.isMicrophoneAuthorized().then((result)=>{
      console.log(result,"Microphone")
      if(result==false){
            this.diagnostic.requestMicrophoneAuthorization()
             .then((state) => {
              console.log(state,"state")
           }).catch(e => console.error(e));
      }
    },error=>{
      console.log("error",error)
    });
  }
}

