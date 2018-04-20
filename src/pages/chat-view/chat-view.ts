import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider}from '../../providers/user/user'; 
import {ToastProvider}from '../../providers/toast/toast'; 
/**
 * Generated class for the ChatViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-view',
  templateUrl: 'chat-view.html',
})
export class ChatViewPage {
  height = '86%';
  bottom = '0px';
  msg:string="";
  sender_info:any;
  constructor(public toast:ToastProvider,public navCtrl: NavController, public navParams: NavParams,public user:UserProvider) {
    this.sender_info=this.navParams.get("chat_info");
    // console.log(this.sender_info,"sender detail")
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatViewPage');
  }

  sendMessage(){
    let params={
      "receiver_id":this.sender_info.id,
      "message":this.msg,
      "phone":this.sender_info.phone,
      "sender_id":this.user.user_info["id"],
    }
    this.user.sendMessage(params).subscribe(res =>  {
      if(res.status){
        console.log("sms send");
        this.toast.showToast("SMS sent");
      }else{
        this.toast.showToast("Error sending Message");
      }
   }, err =>  {
        this.toast.showToast("Server not responding");
    })
    this.msg="";
  }
}
