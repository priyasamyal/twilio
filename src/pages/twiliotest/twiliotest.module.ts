import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwiliotestPage } from './twiliotest';

@NgModule({
  declarations: [
    TwiliotestPage,
  ],
  imports: [
    IonicPageModule.forChild(TwiliotestPage),
  ],
  exports:[TwiliotestPage]
})
export class TwiliotestPageModule {}
