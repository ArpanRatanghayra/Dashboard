import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'queues-cmp',
    moduleId: module.id,
    templateUrl: 'queues.component.html'
})

export class QueuesComponent implements OnInit{
    public store_list: any[];
    ngOnInit() {
        this.store_list = ['Pantaloons-Delhi','Pantaloons-Mumbai','Pantaloos-Chennai','Pantaloons-Kolkata']
    }
    Submit(a,b,c,d)
    {
        console.log(a,b,c,d)

    }
}
