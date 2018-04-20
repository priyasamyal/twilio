import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { ToastProvider } from '../providers/toast/toast';
import { ApiProvider } from '../providers/api/api';
import { UserProvider } from '../providers/user/user';
import { LoadingProvider } from '../providers/loading/loading';


import { IonicStorageModule } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';

import { Diagnostic } from '@ionic-native/diagnostic';

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true,}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
  
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastProvider,
    ApiProvider,
    UserProvider,
    LoadingProvider,
    StorageProvider,
    Diagnostic
  ]
})
export class AppModule {}
