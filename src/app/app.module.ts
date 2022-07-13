import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './meterial-module';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise/main';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { OrderDetailsComponent } from './layout/admin-layout/order-management/order-details/order-details.component';
import { ShipmentDetailsComponent } from './layout/admin-layout/order-management/shipment-details/shipment-details.component';


import { AppRoutingModule } from './app.routing.module';
import { AdminLayoutModule } from './layout/admin-layout/admin-layout.module';

import { AuthGuard } from './authGuards/auth.guard';

import { EffectsModule } from '@ngrx/effects';
import { IndexEffects } from './infex.effect';
import { StoreModule } from '@ngrx/store';
import { IndexReducer, clearState } from './index.redurcer';
import { CustomModule } from './custom/custom.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { CustomValidations } from './utils/validations/custom.validations';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreManagementModule } from './layout/admin-layout/store-management/store-management.module';
import { CategoryManagementModule } from './layout/admin-layout/category-management/category-management.module';
import { MerchantManagementModule } from './layout/admin-layout/merchant-management/merchant-management.module';
import { CatalogManagementModule } from './layout/admin-layout/catalog-management/catalog-management.module';
import { DeliveryBoyManagementModule } from './layout/admin-layout/delivery-boy-management/delivery-boy-management.module';
import { OrderManagementModule } from './layout/admin-layout/order-management/order-management.module';
import { IdentityVerificationModule } from './layout/admin-layout/identity-verification/identity-verification.module';
import { CouponManagementModule } from './layout/admin-layout/coupon-management/coupon-management.module';
import { DatePipe } from '@angular/common';
import { NgxColorsModule } from 'ngx-colors';

const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  "bgsColor": "#357ad6",
  "bgsOpacity": 0.9,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "rectangle-bounce",
  "blur": 5,
  "fgsColor": "#357ad6",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "rectangle-bounce",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 100,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.01)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
}
@NgModule({
  declarations: [
    AppComponent,
    OrderDetailsComponent,
    ShipmentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ColorPickerModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    AdminLayoutModule,
    StoreManagementModule,
    CategoryManagementModule,
    MerchantManagementModule,
    CatalogManagementModule,
    DeliveryBoyManagementModule,
    OrderManagementModule,
    CouponManagementModule,
    IdentityVerificationModule,
    CustomModule,
    OverlayModule,
    NgxColorsModule,
    ToastrModule.forRoot(),
    EffectsModule.forRoot(IndexEffects),
    NgxMaterialTimepickerModule.setLocale('en-US'),
    StoreModule.forRoot(IndexReducer, { metaReducers: [clearState] }),
    StoreDevtoolsModule.instrument(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: "registerImmediately" })
  ],
  exports: [MaterialModule, CustomModule, NgxColorsModule],
  providers: [AuthGuard, CustomValidations, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ShipmentDetailsComponent, OrderDetailsComponent]
})
export class AppModule { }