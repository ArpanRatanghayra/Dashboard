import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'queue-cmp',
    moduleId: module.id,
    templateUrl: 'queue.component.html'
})

export class QueueComponent implements OnInit{
    public store_list: any[];
    public html:any
    ngOnInit() {
        this.store_list = ['Pantaloons-Delhi','Pantaloons-Mumbai','Pantaloos-Chennai','Pantaloons-Kolkata']
    }
    Submit(a,b,c,d)
    {
        console.log(a,b,c,d)

    }
    dp()
    {
        this.html='<ul class="dropdown-menu"><li><a href="#">HTML</a></li><li><a href="#">CSS</a></li><li><a href="#">JavaScript</a></li></ul>'
    }
}
