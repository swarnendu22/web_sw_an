import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import { CustomerOrderDetailsComponent } from './customer-order-details/customer-order-details.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { PaymentLinkComponent } from './payment-link/payment-link.component';
import { OrdersComponent } from './orders/orders.component';
import { EcomShipmentOrdersComponent } from './ecom-shipment-orders/ecom-shipment-orders.component';
import { HyperlocalShipmentComponent } from './hyperlocal-shipment/hyperlocal-shipment.component';

const routes: Routes = [
  { path: 'pending-orders', component: PendingOrdersComponent },
  { path: 'ecom-shipment-orders', component: EcomShipmentOrdersComponent },
  { path: 'hyperlocal-shipment', component: HyperlocalShipmentComponent },
  { path: 'completed-orders', component: CompletedOrdersComponent },
  { path: 'cancelled-orders', component: CancelledOrdersComponent },
  { path: 'customer-orders', component: CustomerOrderDetailsComponent },
  { path: 'order-report', component: OrderReportComponent },
  { path: 'payment-link', component: PaymentLinkComponent },
  { path: 'orders-list/:filterDate', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
