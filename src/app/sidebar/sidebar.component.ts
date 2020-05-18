import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/promotion',     title: 'Promotions',        icon:'nc-world-2',    class: '' },
    { path: '/customer',      title: 'Customer',          icon:'nc-single-02',      class: '' },
    { path: '/feedback',      title: 'Feedback',          icon:'nc-support-17',    class: '' },
    { path: '/queue',         title: 'Queue Management',  icon:'nc-circle-10',  class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        console.log(this.menuItems);
    }
}
