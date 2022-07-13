import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { ManageIdentityVerificationComponent } from './manage-identity-verification/manage-identity-verification.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/meterial-module';
import { IdentityVerificationRoutingModule } from './identity-verification-routing.module';
import { IdentityVerificationModalComponent } from '../components/identity-verification-modal/identity-verification-modal.component';
import { ActiveCustomerComponent } from './active-customer/active-customer.component';
import { BlockedCustomerComponent } from './blocked-customer/blocked-customer.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { AffiliateUserManagementComponent } from './affiliate-user-management/affiliate-user-management.component';
import { DEUsersComponent } from './de-users/de-users.component';
import { DeUsersAreaOperationComponent } from './de-users-area-operation-component/de-users-area-operation-component.component';
import { FilterDeUsersComponent } from './filter-de-users-component/filter-de-users-component.component';
import { DeUserCellRendererComponent } from './de-user-cell-renderer/de-user-cell-renderer.component';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { PaymentsReconcilationComponent } from './payments-reconcilation/payments-reconcilation.component';
import { UploadPaymentCsvComponent } from './upload-payment-csv/upload-payment-csv.component';
import { CustomModule } from '../../../custom/custom.module';
import { PaymentReconDataListComponent } from './payment-recon-data-list/payment-recon-data-list.component';
import { SellerPaymentSettlementComponent } from './seller-payment-settlement/seller-payment-settlement.component';
import { SellerSettlementDetailListComponent } from './seller-settlement-detail-list/seller-settlement-detail-list.component';
// import { FilterDeUsersComponentComponent } from './filter-de-users-component/filter-de-users-component.component';

@NgModule({
    declarations: [
        ManageIdentityVerificationComponent,
        ActiveCustomerComponent,
        BlockedCustomerComponent,
        AffiliateUserManagementComponent,
        DEUsersComponent,
        DeUsersAreaOperationComponent,
        FilterDeUsersComponent,
        DeUserCellRendererComponent,
        PaymentsReconcilationComponent,
        UploadPaymentCsvComponent,
        PaymentReconDataListComponent,
        SellerPaymentSettlementComponent,
        SellerSettlementDetailListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IdentityVerificationRoutingModule,
        RouterModule,
        CustomModule,
        ReactiveFormsModule,
        MaterialModule,
        AgGridModule,
        NgxPaginationModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
            apiKey: 'AIzaSyC0L4aWz6tMLmFj--LKx7gvw4kxPSRJUGo',
            libraries: ['places']
        }),
        MatGoogleMapsAutocompleteModule
    ],
    entryComponents: [FilterDeUsersComponent, DeUserCellRendererComponent, DeUsersAreaOperationComponent,
        UploadPaymentCsvComponent
    ],
    providers: [
        AgGridOptions
    ],
})
export class IdentityVerificationModule { }
