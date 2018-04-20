import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallViewPage } from './call-view';

@NgModule({
  declarations: [
    CallViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CallViewPage),
  ],
})
export class CallViewPageModule {}
