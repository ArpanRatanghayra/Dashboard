export class Store {

    public storeName: string;
    public customerLimit: number;
    public customerQueue: any;
    public customerInStore: any;
    public visitorList: any;
    public queueExit: any;
    public BrandId?: any;
    public companyId?: any;
    constructor(storeName: string, customerLimit: number, customerQueue: any, customerInStore: any, visitorList: any, queueExit: any) {
        this.storeName = storeName;
        this.customerLimit = customerLimit;
        this.customerQueue = customerQueue;
        this.customerInStore = customerInStore;
        this.visitorList = visitorList;
        this.queueExit = queueExit;
    }
}