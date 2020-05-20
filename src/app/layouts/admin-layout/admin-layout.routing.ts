import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { QueueComponent } from '../../pages/queue/queue.component';
import { QueuesComponent } from '../../pages/queues/queues.component';
import { PromotionComponent } from '../../pages/promotion/promotion.component';
import { FeedbackComponent } from '../../pages/feedback/feedback.component';
import { CustomerComponent } from '../../pages/customer/customer.component'

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'queue',          component: QueueComponent },
    { path: 'queues',          component: QueuesComponent },
    { path: 'promotion',      component: PromotionComponent },
    { path: 'customer',       component: CustomerComponent },
    { path: 'feedback',  component: FeedbackComponent }
];
