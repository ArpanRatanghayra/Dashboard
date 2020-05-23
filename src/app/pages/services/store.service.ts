import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from '../constants/store';
import { Customer } from '../constants/customer';
import { map } from 'rxjs/operators';
import { Token } from '../constants/token';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { StoreDetail } from '../constants/StoreDetail';
import { AuthService } from './auth.service';
import { DeleteImage } from '../constants/deleteImage';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  basepath='shopLogo/'
  baseAdpath='shopAds/'
  formData: StoreDetail;
  imageDetailList: AngularFireList<any>;
  imageAdsDetailList: AngularFireList<any>;
  adminList:AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id: '',
    name:'',
    url: ''
  };
  dataSet1:Data1={
    id:'',
    ExternalURL :'',
    url: ''
  }
  msg: string = "error";

  constructor(private fireStore: AngularFirestore,private authService:AuthService, private db: AngularFireDatabase) { }

  public async addShop(store: Store): Promise<any> {
    return this.fireStore.collection<Store>('store').add(JSON.parse(JSON.stringify(store)));
  }

  public async getShopDetails(): Promise<Observable<any>> {
    const res = await this.fireStore.collection<Store>('store').snapshotChanges();
    return res;
  }

  public async getOneShopDetails(id: string): Promise<Observable<any>> {
    const res = await this.fireStore.collection<Store>('store').doc(id).snapshotChanges();
    return res;
  }

  getShop() {
    if (this.authService.getUid() == 'empty') {
      return null;
    }
    else {
      var id = this.authService.getUid();
      var citiesRef = this.fireStore.collection("store", ref => ref.where('email', '==', id));
      return citiesRef.snapshotChanges();
    }
  }
getStoreDetailByDocumentId(id){
  var citiesRef = this.fireStore.doc<StoreDetail>('store/'+id);
  return citiesRef.snapshotChanges();
}
  getStoreDetailByCompanyId(companyId) {
      var citiesRef = this.fireStore.collection("store", ref => ref.where('companyId', '==', companyId));
      return citiesRef.snapshotChanges();
  }
  getVisitorList(companyId){
    var citiesRef = this.fireStore.collection("visitorList");
    return citiesRef.snapshotChanges();
  }
  getQueueExitList(companyId){
    var citiesRef = this.fireStore.collection("queueExit");
    return citiesRef.snapshotChanges();
  }

  getShopDetail(id:any){
    var citiref=this.fireStore.collection("store",ref=>ref.where('email','==',id));
    return citiref.snapshotChanges();
  }

  getStoreById(id) {
    const productsDocuments = this.fireStore.doc<StoreDetail>('store/' + id);
    return productsDocuments;
      // .pipe(
      //   map(changes => {
      //     const data = changes.payload.data();
      //     const id = changes.payload.id;
      //     return { id, ...data };
      //   }))
  }
  

  public async getChangedData(): Promise<Observable<any>> {
    let changes = this.fireStore.collection<Store>('store').snapshotChanges();
    return changes;
  }

  public async addCustomer(id: number, store: Store, customer: Customer): Promise<any> {
    if (!store.customerInStore || store.customerInStore === null || store.customerInStore === []) {
      store.customerInStore = [customer];
    } else {
      if (store.customerInStore.phoneNo) {
        let custm = [customer, store.customerInStore];
        store.customerInStore = custm;
      } else {
        const custm = [customer];
        (store.customerInStore).forEach(e => {
          custm.push(e);
        });
        store.customerInStore = custm;
      }
    }
    return this.fireStore.doc('store/' + id).set(JSON.parse(JSON.stringify(store)));
  }

  public async addInQueue(id: number, store: Store, token: Token): Promise<any> {
    if (!store.customerQueue || store.customerQueue === null || store.customerQueue === []) {
      store.customerQueue = [token];
    } else {
      if (store.customerQueue.phoneNo) {
        let tokens = [store.customerQueue, token];
        store.customerQueue = tokens;
      } else {
        let tokens = [token];
        (store.customerQueue).forEach(t => {
          tokens.push(t);
        });
        store.customerQueue = tokens;
      }
    }
    return this.fireStore.doc('store/' + id).set(JSON.parse(JSON.stringify(store)));
  }

  public async checkIfAlreadyInQueue(store: Store, phoneNo: number): Promise<boolean> {
    let status = false;
    if (!store.customerQueue || store.customerQueue === null) {
      return status;
    } else {
      if (store.customerQueue.phoneNo) {
        if (store.customerQueue.phoneNo === phoneNo) {
          const token: Token = store.customerQueue;
          sessionStorage.setItem('token', JSON.stringify(token));
          status = true;
          return status;
        } else {
          return false;
        }
      } else {
        store.customerQueue.forEach(e => {
          if (e.phoneNo === phoneNo) {
            sessionStorage.setItem('token', JSON.stringify(e));
            status = true;
            return;
          }
        });
        return status;
      }
    }
  }

  public checkCustomersInStore(store: Store): number {
    let customers = 0;
    if (store.customerInStore.phoneNo) {
      customers = 1 + store.customerInStore.noOfGuests;
      return customers;
    } else {
      store.customerInStore.forEach(element => {
        customers = customers + element.noOfGuests;
      });
      return customers;
    }
  }

  /*
  public async checkCustomersInStore(store: Store): Promise<number> {
    let customers = 0;
    if (store.customerInStore.phoneNo) {
      customers = 1 + store.customerInStore.noOfGuests;
      return customers;
    } else {
      store.customerInStore.forEach(element => {
        customers = customers + element.noOfGuests + 1;
      });
      return customers;
    }
  }
  */

  public availableCapacity(store: Store): number {
    const available = (store.customerLimit - (this.checkCustomersInStore(store)));
    return available;
  }

  public async checkIfAlreadyInStore(store: Store, phoneNo: number): Promise<boolean> {
    let status = false;
    if (store.customerInStore === null) {
      return status;
    } else {
      if (store.customerInStore.phoneNo === phoneNo) {
        sessionStorage.setItem('customer', JSON.stringify(store.customerInStore));
        status = true;
      } else {
        store.customerInStore.forEach(e => {
          if (e.phoneNo === phoneNo) {
            sessionStorage.setItem('customer', JSON.stringify(e));
            status = true;
            return;
          }
        });
      }
      return status;
    }
  }

  // display Logo with key value
  getFIleUpload(n): AngularFireList<DeleteImage>{
    return this.db.list(this.basepath,ref => 
      ref.limitToLast(n));
  }

  // display ads with key value
  getAdsUpload(n): AngularFireList<DeleteImage>{
    return this.db.list(this.baseAdpath,ref => 
      ref.limitToLast(n))
  }

  getImageDetailList() {
    this.imageDetailList = this.db.list('shopLogo');
  }

  

  getAdsImageDetailList() {
    this.imageAdsDetailList = this.db.list('shopAds');
  }

  insertImageDetails(id,name, url) {
    // this.dataSet = {
    //   id: id,
    //   name:name,
    //   url: url,
    // };
    // this.imageDetailList.push(this.dataSet);
      this.fireStore.collection("store").doc(id).update({"StoreLogo":url});  
      console.log(url);
  }

  insertAdsImageDetails(id,externlUrl, url) {
    this.dataSet1 = {
      id: id,
      ExternalURL:externlUrl,
      url: url
    };
    this.imageAdsDetailList.push(this.dataSet1);
    // let a:any=[];
    // for(let i=0;i<idlength;i++){
    //   a.push(url);
    // }
      // this.fireStore.collection("store").doc(idarray).update({"StoreAds":url});  
      // console.log(url);
  }

  // delete Logo using key value
  deleteImages(file:DeleteImage,id){
    this.deleteFileDatabase(file.key)
      .then(() => {
        this.deleteFileStorage(file.id,file.name);
      })
      .catch(error => console.log(error));
  }
  
  private deleteFileDatabase(key){
    return this.db.list(`${this.basepath}/`).remove(key);
  }

  private deleteFileStorage(id:string,name){
    const storageRef=firebase.storage().ref();
    storageRef.child(`${id}/${this.basepath}/${name}`).delete();
  }


  // delete Ads with key value
  deleteAds(file:DeleteImage,id){
    this.deleteAdsFileDatabase(file.key)
      .then(()=> {
        this.deleteAdsFileStorage(file.id,file.name);
      })
      .catch(error => console.log(error));
  }
  private deleteAdsFileDatabase(key){
    return this.db.list(`${this.baseAdpath}/`).remove(key);
  }

  private deleteAdsFileStorage(id:string,name){
    const storageRef = firebase.storage().ref();
    storageRef.child(`${id}/${this.baseAdpath}/${name}`).delete();
  }

  getAdminList(){
    this.adminList=this.db.list('admin');
  }
 

}

  

export interface Data {
  id: string;
  name:string;
  url: string;
}
export interface Data1{
  id: string;
  ExternalURL:string;
  url: string;
}