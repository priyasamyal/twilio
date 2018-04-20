import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider}from '../../providers/user/user'; 
import {ToastProvider}from '../../providers/toast/toast'; 
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items: Array<any>;
  customers:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams , public user:UserProvider,public toast:ToastProvider,) {
    
    this.getAllCustomers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
 
  filterItems(ev: any) {
    console.log(ev.target)
    //this.getAllCustomers();
    let val = ev.target.value;
    console.log(val);
    if(val=='' || val==undefined){
      this.getAllCustomers();
    }

    if (val && val.trim() !== '') {
    this.customers=this.customers.filter(i=>
    i.name.toLowerCase().includes(val.toLowerCase()))
    }
  }

  getAllCustomers(){
    this.user.getAllCustomer(this.user.user_info['id']).subscribe(res =>  {
      console.log(res, "response");
      if(res.status){
        this.customers=res.data;
        console.log(this.customers,"cus")
      }
       }, err =>  {
      this.toast.showToast("Server not Responding")
     })
  }

}
