export class Customer {
    public phoneNo: number;
    public noOfGuests: number;
    public queueEnterTime: any;
    public queueExitTime: any;
    public queueWaitTime: number;
    public storeEnterTime: any;

    constructor(phoneNo: number, noOfGuests: number, queueEnterTime: any, queueExitTime: any, queueWaitTime: number, storeEnterTime: any) {
        this.phoneNo = phoneNo;
        this.noOfGuests = noOfGuests;
        this.queueEnterTime = queueEnterTime;
        this.queueExitTime = queueExitTime;
        this.queueWaitTime = queueWaitTime;
        this.storeEnterTime = storeEnterTime;
    }
}