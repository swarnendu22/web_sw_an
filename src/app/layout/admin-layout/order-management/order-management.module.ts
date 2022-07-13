import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountToModule } from 'angular-count-to';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MaterialModule } from '../../../meterial-module';
import { AgGridModule } from '../../../../../node_modules/ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '../../../../../node_modules/@angular/forms';
import { CustomModule } from '../../../custom/custom.module';
import { AgGridOptions } from '../../../utils/agGridOption/ag-grid-option';
import { NgxPaginationModule } from '../../../../../node_modules/ngx-pagination';
import { TooltipModule } from '../../../../../node_modules/ng2-tooltip-directive';
import { AgmCoreModule } from '../../../../../node_modules/@agm/core';
import { ExpandMode, NgxTreeSelectModule } from '../../../../../node_modules/ngx-tree-select';
import { NgxMaterialTimepickerModule } from '../../../../../node_modules/ngx-material-timepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { NgxMatSelectSearchModule } from '../../../../../node_modules/ngx-mat-select-search';
import { NgbModule } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CustomerOrderDetailsComponent } from './customer-order-details/customer-order-details.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';
import { CancelledOrdersComponent } from './cancelled-orders/cancelled-orders.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartsModule } from 'ng2-charts';
import { PaymentLinkComponent } from './payment-link/payment-link.component';
import { OrdersComponent } from './orders/orders.component';
import { EcomShipmentOrdersComponent } from './ecom-shipment-orders/ecom-shipment-orders.component';
import { CancelShipmentReasonComponent } from './cancel-shipment-reason/cancel-shipment-reason.component';
import { EcomReportComponent } from './ecom-report/ecom-report.component';
import { HyperlocalShipmentComponent } from './hyperlocal-shipment/hyperlocal-shipment.component';
import { HyperlocalReportComponent } from './hyperlocal-report/hyperlocal-report.component';


@NgModule({
  declarations: [PendingOrdersComponent, CustomerOrderDetailsComponent, CompletedOrdersComponent, CancelledOrdersComponent, OrderReportComponent, PaymentLinkComponent, OrdersComponent, EcomShipmentOrdersComponent, CancelShipmentReasonComponent, EcomReportComponent, HyperlocalShipmentComponent, HyperlocalReportComponent],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    CustomModule,
    NgbModule,
    MatStepperModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatListModule,
    MatExpansionModule,
    NgxMatSelectSearchModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSidenavModule,
    ChartsModule,
    CountToModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMaterialTimepickerModule.setLocale('en-US'),
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    }),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyC0L4aWz6tMLmFj--LKx7gvw4kxPSRJUGo',
      libraries: ['places']
    }),
    NgxPaginationModule,
    TooltipModule,

  ],
  providers: [AgGridOptions],
  entryComponents: [CancelShipmentReasonComponent]
})
export class OrderManagementModule { }
