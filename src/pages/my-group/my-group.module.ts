import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyGroupPage } from './my-group';

@NgModule({
  declarations: [
    MyGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(MyGroupPage),
  ],
  exports:[MyGroupPage]
})
export class MyGroupPageModule {}
