import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import 'firebase/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { StoreService } from './store.service';
// import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  uid: any;
  list = [];

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);


  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }


  constructor(
    private router: Router,
     private db: AngularFireDatabase, 
     private afAuth: AngularFireAuth, 
     private firestore: AngularFirestore, 
     private ngZone: NgZone
     ) {
       this.getCompanyDocId();
       this.getBrandsDocId();
      }

      getCompanyDocId(){
        var citiref=this.firestore.collection("company");
        citiref.snapshotChanges().subscribe(actionArray => {
          this.companyData=actionArray.map(item => {
            return  {
              docid:item.payload.doc.id,
              ...item.payload.doc.data() as {},
            } as CompanyData;
          })
        })
        
    }
    getBrandsDocId(){
      var citiref=this.firestore.collection("Brand");
      citiref.snapshotChanges().subscribe(actionArray => {
        this.brandData=actionArray.map(item => {
          return  {
            docid:item.payload.doc.id,
            ...item.payload.doc.data() as {},
          } as BrandData;
        })
      })
      
  }


  // signinUser(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         this.router.navigate(['/admin']);
  //         console.log('Login Sucess');
  //         firebase.auth().currentUser.getIdToken()
  //           .then(
  //             (token: string) => {
  //               this.token = token;
  //               localStorage.setItem("token", token);
  //               localStorage.setItem("uid", firebase.auth().currentUser.uid);
  //               this.uid=firebase.auth().currentUser.uid;
  //             })
  //       }
  //     )
  //     .catch(
  //       error => console.log(error)
  //     );
  // }

  //   signinUser(email: string, password: string) {

  //     this.afAuth.signInWithEmailAndPassword(email, password)
  //     .then((user)=>{
  //         this.firestore.collection("company").ref.where("username", "==", user.user.email).onSnapshot(snap =>{
  //           snap.forEach(userRef => {
  //             console.log("userRef", userRef.data());
  //             this.currentUser = userRef.data();
  //             //setUserStatus
  //             this.setUserStatus(this.currentUser)
  //             localStorage.setItem("role",userRef.data().role);
  //             firebase.auth().currentUser.getIdToken()
  //               .then(
  //                 (token:string) => {
  //                   this.token=token;
  //                   localStorage.setItem("token",token);
  //                   localStorage.setItem("uid",firebase.auth().currentUser.uid);

  //                 }
  //               )
  //             if(userRef.data().role === "superAdmin") {
  //               this.router.navigate(["/adminSignup"]);
  //             }else{
  //               if(userRef.data().role === "admin"){
  //                 this.router.navigate(["/admin"]);
  //               }else{
  //                 this.router.navigate(["/user"]);
  //               }
  //             }
  //           })
  //         })



  //     }).catch(err => err)
  // }
  // // // //
id:any;
companyCollection:AngularFireList<any>;
companyData:CompanyData[];
 async signinUser(email: string, password: string) {

    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // check in users collection
        this.firestore.collection('users', ref => ref.where('username', '==', user.user.email)).snapshotChanges().subscribe(actionArray => {
          
          if (actionArray.length > 0) {
            this.firestore.collection("users").ref.where("username", "==", user.user.email).onSnapshot(snap => {
              snap.forEach(userRef => {
                console.log("userRef", userRef.data());
                this.currentUser = userRef.data();
                //setUserStatus
                this.setUserStatus(this.currentUser)
                localStorage.setItem("role", userRef.data().role);
              
                firebase.auth().currentUser.getIdToken()
                  .then(
                    async (token: string) => {
                      this.token = token;
                      localStorage.setItem("token", token);
                      localStorage.setItem("uid", firebase.auth().currentUser.uid);
                      // this.id=firebase.auth().currentUser.uid;
                      // var docids:any;
                      // for(let i=0;i<this.companyData.length;i++){
                      //   if(this.companyData[i].id===this.id){
                      //     docids=this.companyData[i].docid;
                      //   }
                      // }
                      // if (userRef.data().role === "admin") {
                      //   this.router.navigate([`/admin/${docids}`]);
                      // }
                    }
                  )
                  
                
                if (userRef.data().role === "superAdmin") {
                  this.router.navigate(["/superAdmin/superAdminDahsBoard"]);
                }
                
             
               
                if (userRef.data().role === "subAdmin") {
                  this.router.navigate(["/brandAdmin"]);
                }
                if (userRef.data().role === "user") {
                  this.router.navigate(["/user"]);
                }


              })
            })
          }

        }
        )

        // check in company collection

        this.firestore.collection('company', ref => ref.where('email', '==', user.user.email)).snapshotChanges().subscribe(snap => {
          if (snap.length > 0) {
            this.firestore.collection("company").ref.where("email", "==", user.user.email).onSnapshot(snap => {
              snap.forEach(userRef => {
                console.log("userRef", userRef.data());
                this.currentUser = userRef.data();
                //setUserStatus
                this.setUserStatus(this.currentUser)
                localStorage.setItem("role", userRef.data().role);
                firebase.auth().currentUser.getIdToken()
                  .then(
                    (token: string) => {
                      this.token = token;
                      localStorage.setItem("token", token);
                      localStorage.setItem("uid", firebase.auth().currentUser.uid);
                      this.id=firebase.auth().currentUser.uid;
                      var docids:any;
                      for(let i=0;i<this.companyData.length;i++){
                        if(this.companyData[i].id===this.id){
                          docids=this.companyData[i].docid;
                        }
                      }
                      if (userRef.data().role === "admin") {
                        this.router.navigate([`/${docids}/companyDashboard`]);
                      }


                    }
                  )
                if (userRef.data().role === "superAdmin") {
                  this.router.navigate(["/adminSignup"]);
                }
                // if (userRef.data().role === "admin") {
                //   this.router.navigate(["/admin"]);
                // }
                if (userRef.data().role === "subAdmin") {
                  this.router.navigate(["/brandAdmin"]);
                }
                if (userRef.data().role === "user") {
                  this.router.navigate(["/user"]);
                }
              })
            })
          }

        }
        )

        // check in Brand collection

        this.firestore.collection('Brand', ref => ref.where('email', '==', user.user.email)).snapshotChanges().subscribe(snap => {
          if (snap.length > 0) {
            this.firestore.collection("Brand").ref.where("email", "==", user.user.email).onSnapshot(snap => {
              snap.forEach(userRef => {
                console.log("userRef", userRef.data());
                this.currentUser = userRef.data();
                //setUserStatus
                this.setUserStatus(this.currentUser)
                localStorage.setItem("role", userRef.data().role);
                firebase.auth().currentUser.getIdToken()
                  .then(
                    (token: string) => {
                      this.token = token;
                      localStorage.setItem("token", token);
                      localStorage.setItem("uid", firebase.auth().currentUser.uid);
                      this.id=firebase.auth().currentUser.uid;
                      var docids:any;
                      for(let i=0;i<this.brandData.length;i++){
                        if(this.brandData[i].id===this.id){
                          docids=this.brandData[i].docid;
                        }
                      }
                      if (userRef.data().role === "subAdmin") {
                        this.router.navigate([`/brandAdmin/${docids}`]);
                      }
                      
                    }
                  )
                if (userRef.data().role === "superAdmin") {
                  this.router.navigate(["/adminSignup"]);
                }
                if (userRef.data().role === "admin") {
                  this.router.navigate(["/admin"]);
                }
               
                if (userRef.data().role === "user") {
                  this.router.navigate(["/user"]);
                }
              })
            })
          }

        }
        )

        // check in store collection

        this.firestore.collection('store', ref => ref.where('email', '==', user.user.email)).snapshotChanges().subscribe(snap => {
          if (snap.length > 0) {
            this.firestore.collection("store").ref.where("email", "==", user.user.email).onSnapshot(snap => {
              snap.forEach(userRef => {
                console.log("userRef", userRef.data());
                this.currentUser = userRef.data();
                //setUserStatus
                this.setUserStatus(this.currentUser)
                localStorage.setItem("role", userRef.data().role);
                firebase.auth().currentUser.getIdToken()
                  .then(
                    (token: string) => {
                      this.token = token;
                      localStorage.setItem("token", token);
                      localStorage.setItem("uid", firebase.auth().currentUser.uid);

                    }
                  )
                if (userRef.data().role === "superAdmin") {
                  this.router.navigate(["/adminSignup"]);
                }
                if (userRef.data().role === "admin") {
                  this.router.navigate(["/admin"]);
                }
                if (userRef.data().role === "subAdmin") {
                  this.router.navigate(["/brandAdmin"]);
                }
                if (userRef.data().role === "user") {
                  this.router.navigate(["/user"]);
                }
              })
            })
          }

        }
        )



      }).catch(err => err)
  }



  adminSignUp(data) {


    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((userResponse) => {
        // add the user to the "users" database
        let user = {
          id:userResponse.user.uid,
          email: userResponse.user.email,
          role: "admin",
          companyName: data.companyName,
          ownerName: data.ownerName,
          companyLogo: data.companyLogo,
          // brand: []
        }

        //add the user to the database
        this.firestore.collection("company").add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);
              // localStorage.setItem("uid", firebase.auth().currentUser.uid);
              // this.router.navigate(["/adminSignup"]);
            })
          }).catch(err => {
            console.log(err);
          })


      })
      .catch((err) => {
        console.log("An error ocurred: ", err);
      })

  }

  brandSignUp(data, docid) {


    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((userResponse) => {
        // add the user to the "users" database
        let user = {
          companyId: docid,
          email: data.email,
          role: "subAdmin",
          BrandName: data.BrandName,
          BrandLogo: data.brandLogo,
        }

        //add the user to the database
        this.firestore.collection("Brand").add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);
              // let uid = userResponse.user.uid;
              // let uid=localStorage.getItem("uid");
              // this.updateCompanyAdminData(docid, uid);
              // this.router.navigate(["/admin"]);
            })
          }).catch(err => {
            console.log(err);
          })


      })
      .catch((err) => {
        console.log("An error ocurred: ", err);
      })

  }

  storeSingUp(data, companyId,brandId,feedbackQue) {


    this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((userResponse) => {
        // add the user to the "users" database
        let user = {
          companyId: companyId,
          BrandId:brandId,
          email: data.email,
          role: "user",
          StoreName: data.storeName,
          StoreLogo: data.storeLogo,
          StoreAds:null,
          StoreNickName: data.storeNickName,
          covoidFreeStatus:data.covoidFreeStatus,
          customerLimit:data.customerLimit,
          customerQueue:null,
          customerInStore:null,
          feedbackQue:feedbackQue,
          visitorList: null,
          queueExit: null,
          Address :[{
           Street  : data.streetName,
           City : data.city,
           State : data.state,
           pincode : data.pincode

          }]
        }

        //add the user to the database
        this.firestore.collection("store").add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);
              // let uid = userResponse.user.uid;
              // let uid=localStorage.getItem("uid");
              // this.updateCompanyAdminData(docid, uid);
              // this.router.navigate(["/admin"]);
            })
          }).catch(err => {
            console.log(err);
          })


      })
      .catch((err) => {
        console.log("An error ocurred: ", err);
      })

  }


  brandData: BrandData[];
  public updateCompanyAdminData(docid, uid) {
    this.getBrandDocId(docid, uid);
    console.log(docid);
    // const doc=this.firestore.doc('company/brand')
    // const arrayUnion=firebase.firestore.FieldValue.arrayUnion;
    // doc.update({
    //   id:arrayUnion(uid)
    // });

    // })
  }
 async getBrandDocId(docid, uid) {
    var brandid = this.firestore.collection("Brand", ref => ref.where('id', '==', uid));
    brandid.snapshotChanges().subscribe(actionArray => {
      
      this.brandData = actionArray.map(item => {
        return {
          docid: item.payload.doc.id,
          ...item.payload.doc.data() as {}
        } as BrandData;
      })
    })
    this.updateCompany(docid,uid);
}

  updateCompany(docid,uid){
    if(this.brandData){
      this.firestore.collection("company").doc(docid).update({
        brand: firebase.firestore.FieldValue.arrayUnion(this.brandData[0].docid)
      })
    }else{
      this.getBrandDocId(docid,uid);
    }
    
  }
  // Store SignUp
  storeSignUp(email: string, password: string, data) {


    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        // add the user to the "users" database
        let user = {
          id: userResponse.user.uid,
          username: userResponse.user.email,
          storeName: null,
          storeAddress: [],
          customerInStore: [],
          Users: [],
          role: "user",
        }

        //add the user to the database
        this.firestore.collection("store").add(user)
          .then(user => {
            user.get().then(x => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              this.setUserStatus(this.currentUser);
              let uid = userResponse.user.uid;
              // let uid=localStorage.getItem("uid");
              this.updateBrandAdminData(data[0].docid, uid);
              this.router.navigate(["/brandAdmin"]);
            })
          }).catch(err => {
            console.log(err);
          })


      })
      .catch((err) => {
        console.log("An error ocurred: ", err);
      })

  }
  storeData: StoreData[];
  public updateBrandAdminData(docid, uid) {
    this.getStoreDocId(docid, uid);
    console.log(this.storeData[0].docid);
    // const doc=this.firestore.doc('company/brand')
    // const arrayUnion=firebase.firestore.FieldValue.arrayUnion;
    // doc.update({
    //   id:arrayUnion(uid)
    // });

    // })
  }
  getStoreDocId(docid, uid) {
    var storeid = this.firestore.collection("store", ref => ref.where('id', '==', uid));
    storeid.snapshotChanges().subscribe(actionArray => {
      this.storeData = actionArray.map(item => {
        return {
          docid: item.payload.doc.id,
          ...item.payload.doc.data() as {}
        } as StoreData;
      })
    })

    this.firestore.collection("Brand").doc(docid).update({
      Store: firebase.firestore.FieldValue.arrayUnion(this.storeData[0].docid)
    })

  }

  public async userChanges() {
    this.afAuth.onAuthStateChanged(currentUser => {
      if (!currentUser) {
        // 
      } else {
        if (currentUser) {
          this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              //setUserStatus
              this.setUserStatus(this.currentUser);
              console.log("hello " + this.userStatus)
              // if(userRef.data().role==="superAdmin"){
              //   this.ngZone.run(()=> this.router.navigate(["/adminSignup"]))
              // }
              // else{
              //   if(userRef.data().role === "admin"){
              //     this.ngZone.run(() => this.router.navigate(["/admin"])); 
              //   }else{
              //       if(userRef.data().role === "user") {
              //         this.router.navigate(["/user"]);
              //     }else{
              //       this.ngZone.run(() => this.router.navigate(["/"])); 
              //     }
              //   }
              // }
            })
          })
        } else {
          //this is the error you where looking at the video that I wasn't able to fix
          //the function is running on refresh so its checking if the user is logged in or not
          //hence the redirect to the login
          this.ngZone.run(() => this.router.navigate(["/login"]));
        }
      }

    })
  }

  rolematch(allowedRoles) {
    this.afAuth.onAuthStateChanged(currentUser => {

      if (currentUser) {
        this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log("hello " + this.userStatus)
            // if(userRef.data().role==="superAdmin"){
            //   this.ngZone.run(()=> this.router.navigate(["/adminSignup"]))
            // }
            // else{
            //   if(userRef.data().role === "admin"){
            //     this.ngZone.run(() => this.router.navigate(["/admin"])); 
            //   }else{
            //       if(userRef.data().role === "user") {
            //         this.router.navigate(["/user"]);
            //     }else{
            //       this.ngZone.run(() => this.router.navigate(["/"])); 
            //     }
            //   }
            // }
            var isMatch = false;
            var userRoles: string = userRef.data().role;
            allowedRoles.forEach(element => {
              if (userRoles.indexOf(element) > -1) {
                isMatch = true;
                return false;
              }
            });
            return isMatch;
          })
        })
      }

    })
  }
  // uid = this.afAuth.authState.pipe(
  //     map(authState => {
  //       if(!authState){
  //         return null;
  //       }else{
  //         return authState.uid;
  //       }
  //     })
  //     );

  // isAdmin:Observable<boolean> = this.uid.pipe(
  //   map(uid => {
  //     if(!uid){
  //       return observableOf(false);
  //     }else{
  //       return this.db.object<boolean>('/admin'+uid).valueChanges();
  //     }
  //   })
  // );

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log("user signed Out successfully");
        //set current user to null to be logged out
        this.currentUser = null;
        //set the listenener to be null, for the UI to react
        this.setUserStatus(null);
        this.token = null;
        localStorage.setItem("token", null);
        localStorage.setItem("uid", null);
        localStorage.setItem("role", null);
        this.ngZone.run(() => this.router.navigate(["/login"]));

      }).catch((err) => {
        console.log(err);
      })

    // this.router.navigate(['/login']);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('uid');
    console.log(user);
    return !(user == null);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getUid() {
    if (this.isAuthenticated()) {
      return String(localStorage.getItem("uid"));
    }
    else {
      return 'empty';
    }
  }

  isAuthenticated() {
    this.token = String(localStorage.getItem("token"));
    //console.log("Auth");
    return this.token != "null";
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  getUser(id) {
    if (id === null) {
      return null;
    } else {
      var user = this.firestore.collection("users", ref => ref.where("id", "==", id));
      return user.snapshotChanges();
    }
  }


}
export class BrandData {
  docid: string;
  id: string;
  email: string;
  role: string;
  BrandName: string;
  BrandLogo: string;
  // BrandPresenceState: [];
  // Store: [];
}
export class StoreData {
  docid: string;
  id: string;
  username: string;
  role: string;
  storeName: string;
  storeAddress: [];
  customerInStore: [];
  Users: [];
}
export class CompanyData {
  docid: string;
  id: string;
  email: string;
  role: string;
  companyName: string;
  ownerName: string;
  companyLogo: string;
  // brand: [];
}