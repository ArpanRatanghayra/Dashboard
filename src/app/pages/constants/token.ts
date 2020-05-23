export class Token {
    public docId;
    public tokenId: number;
    public phoneNo: number;
    public noOfGuests: number;
    public queueEnterTime: any;


    constructor(tokenId: number, phoneNo: number, noOfGuests: number, queueEnterTime: any) {
        this.tokenId = tokenId;
        this.phoneNo = phoneNo;
        this.noOfGuests = noOfGuests;
        this.queueEnterTime = queueEnterTime;
    }
}