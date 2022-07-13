import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryBoyManagementRoutingModule } from './delivery-boy-management-routing.module';
import { DeliveryBoyManagementComponent } from './delivery-boy-management.component';
import { MaterialModule } from 'src/app/meterial-module';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgGridModule } from 'ag-grid-angular';
import { CustomModule } from 'src/app/custom/custom.module';
import { DeliveryBoyCancelPickupReasonsComponent } from './delivery-boy-cancel-pickup-reasons/delivery-boy-cancel-pickup-reasons.component';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryBoyCancelPickupsComponent } from './delivery-boy-cancel-pickups/delivery-boy-cancel-pickups.component';
import { FilterDeliveryBoyCancelPickupsComponent } from './filter-delivery-boy-cancel-pickups/filter-delivery-boy-cancel-pickups.component';
import { ApproveRejectDeliveryBoyCancelPickupsComponent } from './approve-reject-delivery-boy-cancel-pickups/approve-reject-delivery-boy-cancel-pickups.component';
import { DeliveryBoyOrdersComponent } from './delivery-boy-orders/delivery-boy-orders.component';
import { DeliveryBoyOrderTableComponent } from './delivery-boy-order-table/delivery-boy-order-table.component';
import { ResetDeliveryComponent } from './components/reset-delivery/reset-delivery.component';
import { AssignDeliveryBoyComponent } from './components/assign-delivery-boy/assign-delivery-boy.component';
import { UnassignDeliveryBoyComponent } from './components/unassign-delivery-boy/unassign-delivery-boy.component';
import { PendingDeliveryBoyComponent } from './pending-delivery-boy/pending-delivery-boy.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApprovedDeliveryBoyComponent } from './approved-delivery-boy/approved-delivery-boy.component';
import { FilterDeliveryBoysComponent } from './components/filter-delivery-boys/filter-delivery-boys.component';
import { InactiveDeliveryBoyComponent } from './inactive-delivery-boy/inactive-delivery-boy.component';
import { DeliveryBoyDashboardComponent } from './delivery-boy-dashboard/delivery-boy-dashboard.component';
import { DeliveryBoyOrderEarningComponent } from './delivery-boy-order-earning/delivery-boy-order-earning.component';
import { DeliveryBoyDebitNoteComponent } from './delivery-boy-debit-note/delivery-boy-debit-note.component';
import { DeliveryBoyCreditNoteComponent } from './delivery-boy-credit-note/delivery-boy-credit-note.component';
import { DeliveryBoyDetailsComponent } from './delivery-boy-details/delivery-boy-details.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { DriverShiftDetailsComponent } from './driver-shift-details/driver-shift-details.component';
import { DriverEarningDetailsComponent } from './driver-earning-details/driver-earning-details.component';
import { DriverDocumentViewComponent } from './driver-document-view/driver-document-view.component';
import { DeliveryBoyAreaOperationsComponent } from './components/delivery-boy-area-operations/delivery-boy-area-operations.component';
import { DriverDetailsApproveRejectPopupComponent } from '../components/driver-details-approve-reject-popup/driver-details-approve-reject-popup.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ImageCropperModule } from 'ngx-image-cropper';
import { QueryBuilderModule } from 'angular2-query-builder';
import { AceEditorModule } from 'ng2-ace-editor';
import { DriverOrderDetailsComponent } from './driver-order-details/driver-order-details.component';
import { DeliveryBoyActionPopupComponent } from './components/delivery-boy-action-popup/delivery-boy-action-popup.component';
import { DeliveryBoyHistoryComponent } from './components/delivery-boy-history/delivery-boy-history.component';
import { DeliveryBoyEarningBreakupComponent } from './components/delivery-boy-earning-breakup/delivery-boy-earning-breakup.component';
import { DeliveryBoyDashboardListviewComponent } from './components/delivery-boy-dashboard-listview/delivery-boy-dashboard-listview.component';
import { DeliveryBoyDashboardMapviewComponent } from './components/delivery-boy-dashboard-mapview/delivery-boy-dashboard-mapview.component';
import { DeliveryBoyRegistrationComponent } from './delivery-boy-registration/delivery-boy-registration.component';
import { DriverDetailsUpdateComponent } from './driver-details-update/driver-details-update.component';
import { PopupForDeleteComponent } from './components/popup-for-delete/popup-for-delete.component';
import { DriverDetailsHistoryModalComponent } from './components/driver-details-history-modal/driver-details-history-modal.component';
import { DeCommissionSettingsListComponent } from './delivery-boy-commission-settings/de-commission-settings-list/de-commission-settings-list.component';
import { AddDeCommissionSettingComponent } from './delivery-boy-commission-settings/add-de-commission-setting/add-de-commission-setting.component';
import { EditDeCommissionSettingComponent } from './delivery-boy-commission-settings/edit-de-commission-setting/edit-de-commission-setting.component';
import { DECountryResolver } from 'src/app/utils/resolvers/delivery-boy.resolver';
import { AssignTrainingComponent } from './assign-training/assign-training.component';
import { AssignTrainingPopupComponent } from './components/assign-training-popup/assign-training-popup.component';
import { DeliveryBoyMerchandiseComponent } from './delivery-boy-merchandise/delivery-boy-merchandise.component';
import { TraineeDatePopupComponent } from './components/trainee-date-popup/trainee-date-popup.component';
import { DeliveryBoyShcheduleComponent } from './components/delivery-boy-shchedule/delivery-boy-shchedule.component';
import { PopupDeMerchandiseComponent } from './components/popup-de-merchandise/popup-de-merchandise.component';


@NgModule({
  declarations: [FilterDeliveryBoysComponent,
    DeliveryBoyManagementComponent,
    DeliveryBoyCancelPickupReasonsComponent,
    DeliveryBoyCancelPickupsComponent,
    DeliveryBoyDetailsComponent,
    DriverDetailsComponent,
    DriverShiftDetailsComponent,
    DriverEarningDetailsComponent,
    DriverDocumentViewComponent,
    DeliveryBoyAreaOperationsComponent,
    DriverDetailsApproveRejectPopupComponent,
    DriverOrderDetailsComponent,
    FilterDeliveryBoyCancelPickupsComponent,
    ApproveRejectDeliveryBoyCancelPickupsComponent,
    DeliveryBoyOrdersComponent,
    DeliveryBoyOrderTableComponent,
    ResetDeliveryComponent,
    AssignDeliveryBoyComponent,
    UnassignDeliveryBoyComponent,
    PendingDeliveryBoyComponent,
    ApprovedDeliveryBoyComponent,
    InactiveDeliveryBoyComponent,
    DeliveryBoyDashboardComponent,
    DeliveryBoyOrderEarningComponent,
    DeliveryBoyDebitNoteComponent,
    DeliveryBoyCreditNoteComponent,
    DeliveryBoyActionPopupComponent,
    DeliveryBoyHistoryComponent,
    DeliveryBoyEarningBreakupComponent,
    DeliveryBoyDashboardListviewComponent,
    DeliveryBoyDashboardMapviewComponent,
    DeliveryBoyRegistrationComponent,
    DriverDetailsUpdateComponent,
    PopupForDeleteComponent,
    DriverDetailsHistoryModalComponent,
    DeCommissionSettingsListComponent,
    AddDeCommissionSettingComponent,
    EditDeCommissionSettingComponent,
    AssignTrainingComponent,
    AssignTrainingPopupComponent,
    TraineeDatePopupComponent,
    DeliveryBoyShcheduleComponent,
    DeliveryBoyMerchandiseComponent,
    PopupDeMerchandiseComponent],
  imports: [
    CommonModule,
    DeliveryBoyManagementRoutingModule,
    MaterialModule,
    AgGridModule,
    CustomModule,
    NgbModule,
    FormsModule,
    MatSortModule,
    FlexLayoutModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatListModule,
    NgxPaginationModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    MatGridListModule,
    TooltipModule,
    NgxMatSelectSearchModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyC0L4aWz6tMLmFj--LKx7gvw4kxPSRJUGo',
      libraries: ['places']
    }),
    NgxMaterialTimepickerModule.setLocale('en-US'),
    MatGoogleMapsAutocompleteModule,
    NgxPaginationModule,
    ImageCropperModule,
    QueryBuilderModule,
    AceEditorModule
  ],
  entryComponents: [FilterDeliveryBoyCancelPickupsComponent,
    ApproveRejectDeliveryBoyCancelPickupsComponent,
    ResetDeliveryComponent,
    AssignDeliveryBoyComponent,
    UnassignDeliveryBoyComponent,
    FilterDeliveryBoysComponent,
    DeliveryBoyAreaOperationsComponent,
    DriverDetailsApproveRejectPopupComponent,
    DeliveryBoyActionPopupComponent,
    DeliveryBoyHistoryComponent,
    DeliveryBoyEarningBreakupComponent,
    PopupForDeleteComponent,
    DriverDetailsHistoryModalComponent,
    AssignTrainingPopupComponent,
    TraineeDatePopupComponent,
    DeliveryBoyShcheduleComponent,
    PopupDeMerchandiseComponent
  ],
  providers: [AgGridOptions, DECountryResolver],
})
export class DeliveryBoyManagementModule { }