export class StoreDetail {
    id: string;
    email:string;
    password:string;
    StoreName: string;
    storeLogo:string;
    customerLimit: number;
    storeNickName:string;
    storeAddress:any[];
    customerInStore: any=null;
    role:string;
    companyId:string;
    brandId:string;
    covoidFreeStatus: any;
    customerQueue: any=null;
    // visitorList: any=null;
    // queueExit: any=null;
    streetName:any;
    city:any;
    state:any;
    pincode:any;
    feedback:any[];
    feedbackQue?:que[]
    checked?:boolean;
    StoreLogo?:string;
    // userId:string;
}

class que{
    textBox:string
}