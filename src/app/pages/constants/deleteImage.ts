export class DeleteImage{
    key: string;
    name:string;
    id:string;
    url:string;
    file:File;

    constructor(file:File){
        this.file=file;
    }

}