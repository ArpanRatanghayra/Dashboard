import { Component, OnInit } from '@angular/core';
import { StoreDetail } from '../constants/StoreDetail';
import { StoreService } from '../services/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'queues-cmp',
    moduleId: module.id,
    templateUrl: 'queues.component.html'
})

export class QueuesComponent implements OnInit{
    list2: StoreDetail;
    formdata: StoreDetail;
    urlString: any;
    adminId: any;
    list: StoreDetail[];
    userProfileImg:any;
    storeLogo:any;
    storeDetails={
      id:'',
      StoreName:'',
      customerLimit:0,
      covoidFreeStatus:'',
      storeLogo:''
    }
    constructor(private storeService: StoreService, private route: ActivatedRoute, private router: Router,
        private location: Location, private firestore: AngularFirestore,
        private storage: AngularFireStorage) {
        this.list2=new StoreDetail();
       }
    async ngOnInit() {
        this.urlString = ""//this.location.path().split('/');
    console.log(this.urlString[1]);
    this.adminId = this.urlString[1];
    //this.resetForm()

    (this.storeService.getStoreDetailByCompanyId(this.adminId)).subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as {}
        } as StoreDetail;
      })
    });

    (await this.storeService.getStoreDetailByCompanyId(this.adminId)).subscribe(actionArray => {
      this.customerListLimitList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as {}
        } as StoreDetail;
      })
    });
    }
    onEdit(emp: StoreDetail) {
        this.storeDetails = Object.assign({}, emp);
        this.storeLogo=emp.StoreLogo;
      }
      onDelete(id: string) {
        if (confirm("Are you sure to delete this record?")) {
          this.firestore.doc('store/' + id).delete();
          // this.toastr.warning('Deleted successfully','EMP. Register');
        }
      }
      onSubmit(form: NgForm) {
        let data = Object.assign({}, form.value);
        delete data.id;
        if (form.value.id == null)
          this.firestore.collection('store').add(data);
        else
          this.firestore.doc('store/' + form.value.id).update(data);
        this.resetForm(form);
        // this.toastr.success('Submitted successfully', 'EMP. Register');
      }
    
      resetForm(form?: NgForm) {
        if (form != null)
          form.resetForm();
        this.formdata = {
          id: null,
          email: '',
          password: '',
          StoreName: '',
          storeLogo: '',
          customerLimit: null,
          storeNickName: '',
          storeAddress: [],
          customerInStore: null,
          role: '',
          companyId: '',
          brandId: '',
          covoidFreeStatus: '',
          customerQueue: null,
          streetName: '',
          city: '',
          state: '',
          pincode: '',
          feedbackQue: [],
          feedback:[]
    
    
        }
        this.storeLogo='';
      }
      selectedId: any = [];
      selectedImgLogo: any = null
      imgSrc: string = "assets/image_placeholder.jpg";
      imgurl: any;
    
      adminStoreLogo = new FormGroup({
        storeLogo: new FormControl(''),
        storeName: new FormControl(''),
        selectAll: new FormControl('')
      })
    
      adminStoreCustomerLimit = new FormGroup({
        storeNameCustomerLimit: new FormControl(''),
        selectAllCustomerLimit: new FormControl(''),
        customerLimitForAllStore: new FormControl('')
      })
    
      idChange(event) {
        let index = this.selectedId.indexOf(event.target.value);
        console.log(index);
        if (index == -1) {
          this.selectedId.push(event.target.value);
        } else {
          this.selectedId.splice(index, 1);
        }
        console.log(this.selectedId);
      }
    
      selectAllCheckBox(event) {
        const checked = event.target.checked;
        this.list.forEach(val => { val.checked = checked });
        let index = this.selectedId.indexOf(event.target.value);
        console.log(index);
        if (index == -1) {
          this.list.forEach(val => { this.selectedId.push(val.id) })
          // this.selectedId.push(event.target.value);
        } else {
          this.list.forEach(val => { this.selectedId.splice(index, 1) })
          // this.selectedId.splice(index, 1);
        }
        if (checked === false) {
          // this.list.forEach(val => {this.selectedId.splice(index,1)})
          this.selectedId.length = 0;
        }
        let a = []
        this.selectedId.map(x => {
          if (!a.includes(x)) {
            a.push(x)
          }
        })
        this.selectedId = a;
    
        console.log(this.selectedId);
      }
      selectedCustomerLimitId: any = [];
      customerListLimitList:StoreDetail[];
      selectAllCustomerLimitCheckBox(event) {
        // this.customerListLimitList=this.list;
        const checked = event.target.checked;
        this.customerListLimitList.forEach(val => { val.checked = checked });
        let index = this.selectedCustomerLimitId.indexOf(event.target.value);
        console.log(index);
        if (index == -1) {
          this.customerListLimitList.forEach(val => { this.selectedCustomerLimitId.push(val.id) })
          // this.selectedId.push(event.target.value);
        } else {
          this.customerListLimitList.forEach(val => { this.selectedCustomerLimitId.splice(index, 1) })
          // this.selectedId.splice(index, 1);
        }
        if (checked === false) {
          // this.list.forEach(val => {this.selectedId.splice(index,1)})
          this.selectedCustomerLimitId.length = 0;
        }
        let a = []
        this.selectedCustomerLimitId.map(x => {
          if (!a.includes(x)) {
            a.push(x)
          }
        })
        this.selectedCustomerLimitId = a;
    
        // if(this.selectedId.length>1){
        //   this.selectedId.filter((value,index) => this.selectedId.indexOf(value) != index);
        // }
        console.log(this.selectedCustomerLimitId);
      }
      idCustomerLimitChange(event) {
        let index = this.selectedCustomerLimitId.indexOf(event.target.value);
        console.log(index);
        if (index == -1) {
          this.selectedCustomerLimitId.push(event.target.value);
        } else {
          this.selectedCustomerLimitId.splice(index, 1);
        }
        console.log(this.selectedCustomerLimitId);
      }
    
    // checkbox and add customer limit for all shops
    
      addCustomerLimit() {
        if(this.adminStoreCustomerLimit.valid){
          var limit = this.adminStoreCustomerLimit.get('customerLimitForAllStore').value;
          if(this.selectedCustomerLimitId.length>0){
            for(let i = 0 ; i < this.selectedCustomerLimitId.length ; i++ ){
              this.firestore.doc(`store/${this.selectedCustomerLimitId[i]}`).update({customerLimit:limit}); 
            }
            this.resetCustomerLimitForm();
          }else{
            window.alert('Please Select Shop Name FIrsr!!!')
          }
        }
      }
    
      resetCustomerLimitForm() {
        this.selectedCustomerLimitId = [];
        this.adminStoreCustomerLimit.reset();
      }
    
      showPreview(event: any) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => this.imgSrc = e.target.result;
          reader.readAsDataURL(event.target.files[0]);
          this.selectedImgLogo = event.target.files[0];
        }
        else {
          this.imgSrc = 'assets/image_placeholder.jpg';
          this.selectedImgLogo = null;
        }
      }
    
    
      storeiddetail: any = [];
      logoname: any;
      public addLogo() {
        if (this.adminStoreLogo.valid) {
          this.storeiddetail = this.selectedId;
          if (this.storeiddetail.length > 0) {
            for (let i = 0; i < this.storeiddetail.length; i++) {
              this.logoname = `${this.selectedImgLogo.name}_${new Date().getTime()}`
              var filepath = `${this.storeiddetail[i]}/shopLogo/${this.selectedImgLogo.name}_${new Date().getTime()}`;
              const fileref = this.storage.ref(filepath);
              this.storage.upload(filepath, this.selectedImgLogo).snapshotChanges().pipe(
                finalize(() => (
                  fileref.getDownloadURL().subscribe((url) => {
                    this.imgurl = url;
                    this.storeService.insertImageDetails(this.storeiddetail[i], this.logoname, this.imgurl);
                    // this,this.storeService.insertImageDetailList(formvalue);
                    this.resetLogoForm();
                  })
                ))
              ).subscribe();
            }
          }
        }
      }
    
      resetLogoForm() {
        this.selectedId = [];
        this.adminStoreLogo.reset();
        this.imgSrc = "assets/image_placeholder.jpg";
        // this.filelist.length=0;
      }
    
    
}
