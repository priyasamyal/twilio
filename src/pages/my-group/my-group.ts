import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastProvider}from '../../providers/toast/toast'; 
import {UserProvider}from '../../providers/user/user'; 
/**
 * Generated class for the MyGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-group',
  templateUrl: 'my-group.html',
})
export class MyGroupPage {
  group_info:any;
  user_list:Object[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public toast:ToastProvider, public user:UserProvider) {
    this.navParams.get("group_data");
    this.group_info=this.navParams.get("group_data");
    this.getUsers();
  }

  getUsers(){
    this.user.get_groups_user(this.group_info.id).subscribe(res =>  {
      console.log(res, "response");
      if(res.status){
        this.user_list=res.data;
      }
       }, err =>  {
      this.toast.showToast("Server not Responding")
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyGroupPage');
  }
  call(){
    console.log("call")
  }
  sendMessage(data){
    console.log("sendsms");
    this.navCtrl.push("ChatViewPage",{chat_info:data})
  }


}
