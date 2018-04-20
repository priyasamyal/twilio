import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiProvider } from '../api/api';
import { LoadingProvider } from '../loading/loading';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  user_info:Object[]=[]
  name:string='';

  constructor(public http: Http,public apiProvider: ApiProvider, public loading: LoadingProvider) {
    console.log('Hello UserProvider Provider');
  }

  login(body) {
    console.log(body,"body login")
    this.loading.showLoading();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiProvider.server_base_url +'login/check_login', body,options)
      .map((res: Response) => {
        console.log(" login response" ,res.json());
        this.loading.hideLoading();
        return res.json();
      })
      .catch((error: any) => {
        this.loading.hideLoading();
        console.log(" login err" ,error);
        return Observable.throw(error.json().error || error);
      });
   }


  get_staff_groups(id) {
    console.log(id,"body get_staff_groups")
    this.loading.showLoading();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiProvider.server_base_url +'api/get_staff_groups/'+id,options )
      .map((res: Response) => {
        console.log(" get_staff_groups response" ,res.json());
       this.loading.hideLoading();
        return res.json();
       })
      .catch((error: any) => {
        this.loading.hideLoading();
        console.log(" get_staff_groups err" ,error);
        return Observable.throw(error.json().error || error);
      });
   }

   get_groups_user(id) {
    console.log(id,"body get_groups_user")
    this.loading.showLoading();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiProvider.server_base_url +'api/get_group_users/'+id,options )
      .map((res: Response) => {
        console.log(" get_groups_user response" ,res.json());
       this.loading.hideLoading();
        return res.json();
       })
      .catch((error: any) => {
        this.loading.hideLoading();
        console.log(" get_groups_user err" ,error);
        return Observable.throw(error.json().error || error);
      });
   }

   sendMessage(body){
    console.log(body,"body sendMessage")
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiProvider.server_base_url +'api/send_message', body,options)
      .map((res: Response) => {
        console.log("sendMessage response" ,res.json());
        return res.json();
      })
      .catch((error: any) => {
        console.log(" sendMessage err" ,error);
        return Observable.throw(error.json().error || error);
      });
   }
   getAllCustomer(id){
    this.loading.showLoading();
    console.log(id,"body getAllCustomer")
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiProvider.server_base_url +'api/get_users_by_staffid/'+id,options)
      .map((res: Response) => {
        console.log("getAllCustomer response" ,res.json());
        this.loading.hideLoading();
        return res.json();
       
      })
      .catch((error: any) => {
        this.loading.hideLoading();
        console.log(" getAllCustomer err" ,error);
        return Observable.throw(error.json().error || error);
      });
   }

   getToken(){
    this.loading.showLoading();
    console.log("getToken")
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("https://webgrowthindia.com/twilio_voicecall/dial_call/token.php",options)
      .map((res: Response) => {
        console.log("getToken" ,res.json());
        this.loading.hideLoading();
        return res.json();
       
      })
      .catch((error: any) => {
        this.loading.hideLoading();
        console.log(" getToken err" ,error);
        return Observable.throw(error.json().error || error);
      });
   }
 }
