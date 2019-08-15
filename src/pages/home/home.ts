import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { CallNumber } from '@ionic-native/call-number';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //url: string = 'http://localhost:57288/api/values';
  //durl: string = 'https://jsonplaceholder.typicode.com/posts';
   url: string = 'http://skynetmy.ddns.net:20888/api/Values';
  pickupdata: any = [];
  key: string = 'items';
  details: any = [];
  pickupdataStore: any = [];
  pickupDataStorage: any =[];
  temparr =[];
  searchString : string = '';
 items: string[];


  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public http: HttpClient,
    private launchNavigator: LaunchNavigator,
    private caller: CallNumber) {
      
  }

  ionViewDidLoad() {


//get request given to the server and got the response
//alert("Api called below");
    let data: Observable<any> = this.http.get(this.url)
    data.subscribe(result => {
      this.pickupdata = result;
      //this.filteredpickupdata1 = result;
     // this.temparr = result;
      
      //alert("Api called");
      console.log(this.pickupdata);
      //alert(this.pickupdata)
      this.saveToStorage(this.pickupdata);
    })
  }


 initializItems(){
     this.temparr = this.pickupdata;

 }


  //save the json data to the storage

  saveToStorage(pickupData) {
    this.storage.set(this.key, this.pickupdata);

    //get data from the storage 


    return this.storage.get(this.key).then((val) => {
      //let pickupData = val;
      //use spread operator to push the array beause array cannot be pushed to array only single values can be pushed
      this.pickupdataStore = val;
      //alert(pickupDataStorage)
      console.log(this.pickupdataStore);
  
      
    });
    
  }

  searchUser(searchBar){
    this.pickupdataStore = this.pickupdata;
    var q = searchBar.target.value;
    //console.log(q);

    if(q && q.trim() == ''){
      return;
    }

    this.pickupdataStore = this.pickupdataStore.filter((v) => {
      //console.log(v.companyName);
        if((v.companyName.toLowerCase().indexOf(q.toLowerCase())) > -1){
          return true;
        }
        return false;
      });
    }



     //make a phone call to the customer
  callNum(contact) {
    //alert(contact);
    let telnum = contact;
    if (telnum == '' || telnum == null) {
      alert('Telephone Number Not Found For the Customer')
    } else {
      this.caller.callNumber(contact, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }


  // Navigate to the Address of the customer 
  navme(address) {
    //alert(address);
    if (address === '' || address === null) {
      alert('Address Of Customer Not Found')
    } else {
      this.launchNavigator.navigate(address);
      //alert('Address is' +address);
    }
  }


  whatsappShare(contact) {
    var telNum = contact;
    telNum = telNum.replace(/[^\d]/g, '');
    if (telNum == '' || telNum == null) {
      alert('Customer has No Phone Number');
    }
    else {
      window.open('https://api.whatsapp.com/send?phone=' + telNum, '_system');
    }
  }
  }




  


