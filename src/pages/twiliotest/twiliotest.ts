import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as twilio from 'twilio';
import {Querystring} from "request/lib/querystring.js";
import {UserProvider}from '../../providers/user/user'; 
const client = new twilio.RestClient("AC5fb9cbd3cd75f4d88291a150a2d9262c", "388822f2da6dd6e2a2061893da3b7139");
const capability=new twilio.Capability("AC5fb9cbd3cd75f4d88291a150a2d9262c", "388822f2da6dd6e2a2061893da3b7139");
declare var Twilio;



/**
 * Generated class for the TwiliotestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-twiliotest',
  templateUrl: 'twiliotest.html',
})
export class TwiliotestPage {
  token;
  connection=null;
  status='Waiting for fetching Status';
  startCall:boolean=true;
  mobile='+917837038921';
  isMute:boolean=false;
  conne

  constructor(public navCtrl: NavController, public navParams: NavParams,public user:UserProvider) {
    Querystring.prototype.unescape = function(val) { return val };
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwiliotestPage');
  }
  ionViewWillEnter(){
    this.getToken();
  }
  getToken(){
    this.user.getToken().subscribe(res =>  {
      console.log(res, "response");
       Twilio.Device.setup(res.token);

        Twilio.Device.ready( (device)=> {
        this.status="Device Ready";
        });
  
        Twilio.Device.error(function (error) {
          console.log("call in error",error);
          this.status='Twilio.Device Error: ' + error.message;
        });
  
         Twilio.Device.incoming( (conn)=> {
          this.status='Incoming connection from ' + conn.parameters.From;
          var archEnemyPhoneNumber =  "+12099517118";
         if (conn.parameters.From === archEnemyPhoneNumber) {
            conn.reject();
            console.log('It\'s your nemesis. Rejected call.');
          } else {
            // accept the incoming connection and start two-way audio
            conn.accept();
          }
        });
     
  
        Twilio.Device.offline( (device)=> {
          alert("offline");
        });
  
       Twilio.Device.connect((conn)=> {
       
         console.log(conn,"connect")
         this.status="Successfully connect call";
         this.startCall=false;
         Twilio.Device.sounds.incoming(true);
         Twilio.Device.sounds.outgoing(true);
         this.bindVolumeIndicators(conn);
        });
  
       Twilio.Device.disconnect((connection)=> {
        this.status="Call disconnect";
         this.startCall=true;
       });

       Twilio.Device.audio.on('deviceChange', updateAllDevices);
       if (Twilio.Device.audio.isSelectionSupported) {
         console.log(Twilio.Device.audio.isSelectionSupported,"Twilio.Device.audio.isSelectionSupported")
       }


    } , err =>  {
      console.log(err,"error")
     })

 function updateAllDevices() {
    this.updateDevices( Twilio.Device.audio.speakerDevices.get());
    this.updateDevices( Twilio.Device.audio.ringtoneDevices.get());
  }



  }
  
  
  bindVolumeIndicators(connection) {
    connection.volume(function(inputVolume, outputVolume) {
    console.log("Volume is",inputVolume, outputVolume) 
    });
  }

  
  get_devices(){
   alert("get device");
   var speakerDevices = Twilio.Device.audio.audioOutputCollection.set();
   console.log(speakerDevices,"speakerDevices.....")
    // navigator.mediaDevices.getUserMedia({ audio: true })
    // .then(res=>{
    //   console.log(res,"res.....");
    //   this.updateDevices( Twilio.Device.audio.speakerDevices.get());
    //   this.updateDevices( Twilio.Device.audio.ringtoneDevices.get());
    // });

    // navigator.mediaDevices.enumerateDevices().then(devices => {
    //   var audiooutput = devices.find(device => device.kind === 'audiooutput');
    //   console.log(devices,"devices....")
    // })
  }

// Update the available ringtone and speaker devices
 updateDevices( selectedDevices) {
  console.log(selectedDevices,"selectedDevices.......")
  Twilio.Device.audio.availableOutputDevices.forEach(function(device, id) {
    var isActive = (selectedDevices.size === 0 && id === 'default');
    selectedDevices.forEach(function(device) {
      console.log(device,"device loop.....")
      if (device.deviceId === id) { isActive = true; }
    });
  });
}

 sendMessage(){
   client.messages.create({
      from:"+1 309-807-4025",
      to: this.mobile,
      body: "You just sent an SMS from ionic SMS using Twilio!"
    }).then((message)=>{
      console.log("message",message)
    },err=>{
      console.log("error",err)
    })
  }

  
  
  speaker(){

    var speakerDevices = Twilio.Device.audio.audioOutputCollection.get();
    console.log(speakerDevices,"speakerDevices");
    alert("speakerDevices");
    Twilio.Device.audio.speakerDevices.set('default');
    console.log( Twilio.Device.audio," Twilio.Device.audio")
  }


  call(){
    this.isMute=false;
    let params =   {To:this.mobile};
    this.connection = Twilio.Device.connect(params);
   }

  hang(){
    Twilio.Device.disconnectAll();
    }
  mute(){
    console.log("this.connection", Twilio.Device.activeConnection(),"mute");
     Twilio.Device.activeConnection().mute(true);
    }
  unmute(){
   Twilio.Device.activeConnection().mute(false);
   }
   
 

}
