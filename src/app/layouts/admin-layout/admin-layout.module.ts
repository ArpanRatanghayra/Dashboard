import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { QueueComponent } from '../../pages/queue/queue.component';
import { PromotionComponent } from '../../pages/promotion/promotion.component';
import { CustomerComponent } from '../../pages/customer/customer.component';
import { FeedbackComponent } from '../../pages/feedback/feedback.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    QueueComponent,
    PromotionComponent,
    CustomerComponent,
    FeedbackComponent
  ]
})

export class AdminLayoutModule {}
