import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MaterialModule } from '../../../meterial-module';
import { CouponManagementRoutingModule } from './coupon-management-routing.module';
import { MasterCouponComponent } from './master-coupon/master-coupon.component';
import { AddStoreCouponComponent } from './add-store-coupon/add-store-coupon.component';

import { StoreCouponComponent } from './store-coupon/store-coupon.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomModule } from 'src/app/custom/custom.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EditCouponStoreComponent } from './edit-coupon-store/edit-coupon-store.component';
import { AddMasterCouponComponent } from './add-master-coupon/add-master-coupon.component';
import { EditMasterCouponComponent } from './edit-master-coupon/edit-master-coupon.component';
import { NgxMatSelectSearchModule } from '../../../../../node_modules/ngx-mat-select-search';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PlatformCouponComponent } from './platform-coupon/platform-coupon.component';
import { CustomCouponComponent } from './custom-coupon/custom-coupon.component';
import { SpecialCouponComponent } from './special-coupon/special-coupon.component';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [MasterCouponComponent, StoreCouponComponent, AddStoreCouponComponent, EditCouponStoreComponent, AddMasterCouponComponent, EditMasterCouponComponent, PlatformCouponComponent, CustomCouponComponent, SpecialCouponComponent, PaymentMethodListComponent],
  imports: [
    CommonModule,
    CouponManagementRoutingModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxMatSelectSearchModule,
    CKEditorModule,
    AgGridModule,
    HttpClientModule,
    AngularEditorModule
  ],
  providers: [],
  entryComponents: [AddStoreCouponComponent, PaymentMethodListComponent]
})
export class CouponManagementModule { }
