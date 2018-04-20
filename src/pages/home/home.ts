import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastProvider}from '../../providers/toast/toast'; 
import {UserProvider}from '../../providers/user/user'; 

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  my_groups:Object[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public toast:ToastProvider, public user:UserProvider) {
    this.getGroups();
    console.log(this.user.user_info);
    
  }
  
  getGroups(){
    this.user.get_staff_groups(this.user.user_info['id']).subscribe(res =>  {
      console.log(res, "response");
      if(res.status){
        this.my_groups=res.data;
      }
       }, err =>  {
      this.toast.showToast("Server not Responding")
     })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToGroupCustomers(group){
    this.navCtrl.push("MyGroupPage",{group_data:group})
  }

  call(){
    console.log("call initiate")
  }
}
