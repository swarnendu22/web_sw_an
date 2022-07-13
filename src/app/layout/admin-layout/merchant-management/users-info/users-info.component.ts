import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { ActivatedRoute, Router } from '../../../../../../node_modules/@angular/router';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { GetHubListByMerchantId, GetMerchantHubStoreUserList, ActionTypes, CreateMerchantHubStoreUser, GetUserDetailsById, GetUpdateMerchantHubUserDetails, UpdateMobileEmailofStore, ResetStoreUserPassword } from './../../../../actions/merchant-management.actions';
import { MerchantManagecellActionButtonComponent } from '../../components/merchant-managecell-action-button/merchant-managecell-action-button.component';
import { FormGroup, Validators, FormBuilder } from '../../../../../../node_modules/@angular/forms';
import { GetCountries } from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { MerchantHubStoreToggleComponent } from '../merchant-hub-store-toggle/merchant-hub-store-toggle.component';
import { StoreUserRestPasswordComponent } from '../store-user-rest-password/store-user-rest-password.component';

@Component({
  selector: "app-users-info",
  templateUrl: "./users-info.component.html",
  styleUrls: ["./users-info.component.css"],
})
export class UsersInfoComponent implements OnInit {
  private gridApi;
  private gridColumnApi;

  columnDefsMerchantUser;
  columnDefsHubUser;
  columnDefsStoreUser;

  defaultColDef;
  defaultColDef2;
  defaultColDef3;

  merchantId = null;
  panelMerchantUser = true;
  panelHubUser = true;
  panelStoreUser = true;
  isMerchantUserShow = true;
  isHubUserShow = true;
  isStoreUserShow = true;
  map = { lat: 22.5392287, lng: 88.3595163 };

  merchantrowData: any = [];
  hubrowData: any = [];
  storerowData: any = [];
  merchantHubStoreUserList = null;

  hubListByMerchantId: any = [];

  countries = null;
  countryMerchant = null;
  countryCodeMerchant = null;
  subscriptionApi: Subscription;
  mechantUserForm: FormGroup;
  hubUserForm: FormGroup;
  storeUserForm: FormGroup;

  isMerchantUserUpdateForm: boolean = true;
  isHubUserUpdateForm: boolean = true;
  MerchantUserByID: any = null;
  HubUserByID: any = null;
  designation: any = null;

  MerchantUserId: number = null;
  HubUserId: number = null;
  storeUserId: number = null;

  merchantCountryCode: any = null;
  merchantCountryMobileCode: any = null;
  hubCountryCode: any = null;
  hubCountryMobileCode: any = null;
  storeUserCounrtyMobileCode: any = null;
  merchantUserActive: boolean = true;
  HubUserActive: boolean = true;
  storeUserActive: boolean = true;
  required: boolean = true;
  exsistingPhoneNo: number = null;
  exsistingEmail: any = null;
  userIdForPassword: any = null;
  updateStoreUserData: boolean = true;

  constructor(
    public dialog: MatDialog,
    private ag: AgGridOptions,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private fb: FormBuilder,
    private http: HttpClient,
    private apiMessageService: ApiMessageService
  ) {
    this.merchantId = this.activatedRoute.snapshot.params.id;

    this.columnDefsMerchantUser = [
      {
        headerName: "User ID",
        field: "userId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Name",
        field: "name",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Phone",
        field: "phone",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Email",
        field: "email",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Active",
        field: "isActive",
        cellRendererFramework: MerchantHubStoreToggleComponent,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        autoHeight: false,
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: "Action",
        field: "value",
        colId: "params",
        cellRendererFramework: MerchantManagecellActionButtonComponent,
        cellRendererParams: {
          onActionBtnClick: [this.requestFnctn.bind(this, "MerchantUser")],
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },
    ];

    this.columnDefsHubUser = [
      {
        headerName: "User ID",
        field: "userId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "User Name",
        field: "name",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Merchant ID",
        field: "merchantId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Hub ID",
        field: "hubId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Merchant Address",
        field: "merchantAddress",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "HUB Address",
        field: "address",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Phone",
        field: "phone",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Email",
        field: "email",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Active",
        field: "isActive",
        cellRendererFramework: MerchantHubStoreToggleComponent,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        autoHeight: false,
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: "Action",
        field: "value",
        colId: "params",
        cellRendererFramework: MerchantManagecellActionButtonComponent,
        cellRendererParams: {
          onActionBtnClick: [this.requestFnctn.bind(this, "HubUser")],
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },
    ];

    this.columnDefsStoreUser = [
      {
        headerName: "User ID",
        field: "userId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "User Name",
        field: "name",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Merchant ID",
        field: "merchantId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "HUB ID",
        field: "hubId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Store ID",
        field: "storeId",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Store Name",
        field: "storeName",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Phone",
        field: "phone",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Email",
        field: "email",
        resizable: true,
        sortable: true,
      },
      {
        headerName: "Active",
        field: "isActive",
        cellRendererFramework: MerchantHubStoreToggleComponent,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        autoHeight: false,
        sortable: false,
        filter: false,
        resizable: false,
      },
      {
        headerName: "Action",
        field: "value",
        colId: "params",
        cellRendererFramework: MerchantManagecellActionButtonComponent,
        cellRendererParams: {
          onActionBtnClick: [this.requestFnctn.bind(this, "StoreUser")],
        },
        sortable: false,
        filter: false,
        floatingFiltersHeight: 0,
        resizable: true,
      },
    ];
    this.store.dispatch(new GetCountries());
    this.store.dispatch(new GetHubListByMerchantId(this.merchantId));
    this.store.dispatch(new GetMerchantHubStoreUserList(this.merchantId));
  }

  ngOnInit(): void {
    this.mechantUserForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(100)]],
      country: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.maxLength(10)]],
      email: ["", [Validators.email, Validators.maxLength(200)]],
    });

    this.hubUserForm = this.fb.group({
      entityId: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      country: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.maxLength(10)]],
      email: ["", [Validators.email, Validators.maxLength(100)]],
    });

    this.storeUserForm = this.fb.group({
      entityId: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.maxLength(100)]],
      country: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.maxLength(10)]],
      email: ["", [Validators.email, Validators.maxLength(100)]],
    });

    this.store.pipe(select<any, any>("general")).subscribe((res) => {
      this.countries = res["countries"] ? res["countries"]["payload"] : "";
    });
    this.store.pipe(select("merchantManagement")).subscribe((res) => {
      if (res.hubListByMerchantId) {
        // console.log(res.hubListByMerchantId)
        this.hubListByMerchantId = res.hubListByMerchantId["obj"];
      }
      if (res.storeUserDetailsByIds) {
        // console.log( res )
        let userDeatailsbyId = res.storeUserDetailsByIds.payload;
        if (this.designation === "MerchantUser") {
          if (userDeatailsbyId.enabled == "1") {
            this.merchantUserActive = true;
          } else {
            this.merchantUserActive = false;
          }
          this.mechantUserForm.get("name").setValue(userDeatailsbyId.name);
          this.mechantUserForm
            .get("country")
            .setValue(userDeatailsbyId.country);
          this.mechantUserForm.get("phone").setValue(userDeatailsbyId.phone);
          this.mechantUserForm.get("email").setValue(userDeatailsbyId.email);
          this.merchantCountryMobileCode = userDeatailsbyId.countryCode;
          this.required = false;
          this.mechantUserForm.controls["phone"].disable();
        } else if (this.designation === "HubUser") {
          if (userDeatailsbyId.enabled == "1") {
            this.HubUserActive = true;
          } else {
            this.HubUserActive = false;
          }
          this.hubUserForm.get("name").setValue(userDeatailsbyId.name);
          this.hubUserForm.get("country").setValue(userDeatailsbyId.country);
          this.hubUserForm.get("phone").setValue(userDeatailsbyId.phone);
          this.hubUserForm.get("email").setValue(userDeatailsbyId.email);
          this.hubUserForm.get("entityId").setValue(userDeatailsbyId.entityId);
          this.hubCountryMobileCode = userDeatailsbyId.countryCode;
        } else if (this.designation === "StoreUser" && this.updateStoreUserData) {
          if (userDeatailsbyId.enabled == "1") {
            this.storeUserActive = true;
          } else {
            this.storeUserActive = false;
          }
          this.userIdForPassword = userDeatailsbyId.userId;
          this.exsistingPhoneNo = userDeatailsbyId.phone;
          this.exsistingEmail = userDeatailsbyId.email;
          // console.log( userDeatailsbyId.phone );
          this.storeUserForm.get("name").setValue(userDeatailsbyId.name);
          this.storeUserForm.get("country").setValue(userDeatailsbyId.country);
          this.storeUserForm.get("phone").setValue(userDeatailsbyId.phone);
          this.storeUserForm.get("email").setValue(userDeatailsbyId.email);
          this.storeUserCounrtyMobileCode = userDeatailsbyId.countryCode;
          // this.storeUserForm.controls['phone'].disable();
          this.storeUserForm.controls["name"].disable();
        }
      }
      // if( res.saveUpdateMerchantHubUserDetails){
      //   console.log(res.saveUpdateMerchantHubUserDetails)
      // }
    });
  }
  onSubmitMerchantUserAdd() {
    if (this.mechantUserForm.valid) {
      let payload = {
        name: this.mechantUserForm.get("name").value,
        country: this.merchantCountryCode,
        countryCode: this.merchantCountryMobileCode,
        phone: this.mechantUserForm.get("phone").value,
        email: this.mechantUserForm.get("email").value,
        role: "MERCHANT",
        entityId: this.merchantId,
      };
      this.store.dispatch(new CreateMerchantHubStoreUser(payload));

      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe(
        (data: any) => {
          if (
            data.status === true &&
            data.type == ActionTypes.createMerchantHubStoreUser
          ) {
            this.resetMerchantForm();
            this.hideMerchantUser();
            this.store.dispatch(
              new GetMerchantHubStoreUserList(this.merchantId)
            );
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.mechantUserForm);
    }
  }
  onSubmitHubUserAdd() {
    if (this.hubUserForm.valid) {
      let payload = {
        name: this.hubUserForm.get("name").value,
        country: this.hubCountryCode,
        countryCode: this.hubCountryMobileCode,
        phone: this.hubUserForm.get("phone").value,
        email: this.hubUserForm.get("email").value,
        role: "HUB",
        entityId: this.hubUserForm.get("entityId").value,
      };
      this.store.dispatch(new CreateMerchantHubStoreUser(payload));

      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe(
        (data: any) => {
          if (
            data.status === true &&
            data.type == ActionTypes.createMerchantHubStoreUser
          ) {
            this.resetHubForm();
            this.hideHubUser();
            this.store.dispatch(
              new GetMerchantHubStoreUserList(this.merchantId)
            );
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.hubUserForm);
    }
  }

  resetMerchantForm() {
    this.mechantUserForm.reset();
    this.isMerchantUserUpdateForm = false;
    this.designation = null;
  }
  resetHubForm() {
    this.hubUserForm.reset();
    this.isHubUserUpdateForm = false;
    this.designation = null;
  }
  resetStoreForm() {
    this.storeUserForm.reset();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  requestFnctn(designation, params) {
    if (designation === "MerchantUser") {
      this.designation = designation;
      this.MerchantUserId = params.alldata.id;
      this.isMerchantUserUpdateForm = true;
      this.store.dispatch(
        new GetUserDetailsById({
          id: params.alldata.id,
        })
      );
      this.isMerchantUserShow = false;
    } else if (designation === "HubUser") {
      this.designation = designation;
      this.HubUserId = params.alldata.id;
      this.isHubUserUpdateForm = true;
      this.store.dispatch(
        new GetUserDetailsById({
          id: params.alldata.id,
        })
      );
      this.isHubUserShow = false;
    } else if (designation === "StoreUser") {
      this.designation = designation;
      this.storeUserId = params.alldata.id;
      this.updateStoreUserData = true;
      this.store.dispatch(
        new GetUserDetailsById({
          id: params.alldata.id,
        })
      );
      this.isStoreUserShow = false;
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.store.pipe(select("merchantManagement")).subscribe((res) => {
      this.merchantHubStoreUserList = res.merchantHubStoreUserList;
      if (this.merchantHubStoreUserList) {
        this.merchantrowData =
          this.merchantHubStoreUserList["payload"].merchantUserList;
        this.hubrowData = this.merchantHubStoreUserList["payload"].hubUserList;
        this.storerowData =
          this.merchantHubStoreUserList["payload"].storeUserList;
      }
    });
  }
  onGridSizeChanged(params) {
    var gridWidth = params.offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  openMerchantUserForm() {
    this.isMerchantUserShow = false;
    this.merchantUserActive = true;
    this.resetMerchantForm();
    this.required = true;
    this.mechantUserForm.controls["phone"].enable();
  }
  hideMerchantUser() {
    this.isMerchantUserShow = true;
  }
  onSubmitMerchantUserUpdate() {
    if (this.mechantUserForm.valid) {
      let payload = {
        name: this.mechantUserForm.get("name").value,
        country: this.mechantUserForm.get("country").value,
        phone: this.mechantUserForm.get("phone").value,
        email: this.mechantUserForm.get("email").value,
        id: this.MerchantUserId,
        countryCode: this.merchantCountryMobileCode,
        isActive: this.merchantUserActive,
      };
      this.store.dispatch(new GetUpdateMerchantHubUserDetails(payload));

      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe(
        (data: any) => {
          if (
            data.status === true &&
            data.type == ActionTypes.getUpdateMerchantHubUserDetails
          ) {
            this.resetMerchantForm();
            this.hideMerchantUser();
            this.store.dispatch(
              new GetMerchantHubStoreUserList(this.merchantId)
            );
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.mechantUserForm);
    }
  }
  onSubmitHubUserUpdate() {
    if (this.hubUserForm.valid) {
      let payload = {
        name: this.hubUserForm.get("name").value,
        country: this.hubUserForm.get("country").value,
        phone: this.hubUserForm.get("phone").value,
        email: this.hubUserForm.get("email").value,
        id: this.HubUserId,
        countryCode: this.hubCountryMobileCode,
        isActive: this.HubUserActive,
      };
      this.store.dispatch(new GetUpdateMerchantHubUserDetails(payload));

      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe(
        (data: any) => {
          if (
            data.status === true &&
            data.type == ActionTypes.getUpdateMerchantHubUserDetails
          ) {
            this.resetHubForm();
            this.hideHubUser();
            this.store.dispatch(
              new GetMerchantHubStoreUserList(this.merchantId)
            );
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.hubUserForm);
    }
  }
  onSubmitStoreUserUpdate() {
    if (
      this.storeUserForm.get("phone").value != null &&
      this.storeUserForm.get("phone").value != ""
    ) {
      let email = this.storeUserForm.get("email").value;
      if (this.storeUserForm.get("email").value == "") {
        email = null;
      }
      let payload = {
        country: this.storeUserForm.get("country").value,
        countryCode: this.storeUserCounrtyMobileCode,
        email: email,
        id: this.storeUserId,
        isActive: this.storeUserActive,
      };
      this.store.dispatch(new GetUpdateMerchantHubUserDetails(payload));
      if (this.subscriptionApi) {
        this.subscriptionApi.unsubscribe();
      }
      this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe(
        (data: any) => {
          if (
            data.status === true &&
            data.type == ActionTypes.getUpdateMerchantHubUserDetails
          ) {
            this.resetStoreForm();
            this.hideStoreUser();
            this.store.dispatch(
              new GetMerchantHubStoreUserList(this.merchantId)
            );
          }
        }
      );
    } else {
      this.markFormGroupTouched(this.storeUserForm);
    }
  }
  updateStoreUserContact() {
    const newNumber = this.storeUserForm.get("phone").value;
    let payload = {
      exsistingPhoneNo: this.exsistingPhoneNo,
      newPhoneNo: this.storeUserForm.get("phone").value,
      updateType: "phone",
    };
    this.updateStoreUserData = false;
    this.store.dispatch(new UpdateMobileEmailofStore(payload));
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
    this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe( (data: any) => {
      if ( data.status === true && data.type == ActionTypes.updateMobileEmailofStore ) {
        this.store.dispatch(new GetMerchantHubStoreUserList(this.merchantId));
        this.storeUserForm.get("phone").setValue( newNumber );
        this.exsistingPhoneNo = newNumber;
      }
    }
  );
  }


  updateStoreUserEmail() {
    const newEmail = this.storeUserForm.get("email").value;
    if( this.exsistingEmail ){
      let payload = {
        exsistingEmail: this.exsistingEmail,
        newEmail: this.storeUserForm.get("email").value,
        updateType : "email"
      }
      this.updateStoreUserData = false;
      this.store.dispatch(new UpdateMobileEmailofStore(payload));
      this.apiMessageService.currentApiStatus.subscribe( (data: any) => {
          if ( data.status === true && data.type == ActionTypes.updateMobileEmailofStore ) {
            this.store.dispatch(new GetMerchantHubStoreUserList(this.merchantId));
            this.exsistingEmail = newEmail;
          }
        }
      );
    } else {
      let payload = {
        country: this.storeUserForm.get("country").value,
        countryCode: this.storeUserCounrtyMobileCode,
        email: this.storeUserForm.get("email").value,
        id: this.storeUserId,
        isActive: this.storeUserActive,
      };
      this.updateStoreUserData = false;
      this.store.dispatch(new GetUpdateMerchantHubUserDetails(payload));
      this.apiMessageService.currentApiStatus.subscribe( (data: any) => {
        if ( data.status === true && data.type == ActionTypes.getUpdateMerchantHubUserDetails ) {
          this.store.dispatch(new GetMerchantHubStoreUserList(this.merchantId));
          this.exsistingEmail = newEmail;
        }
      }
    );
    }
    this.storeUserForm.get("email").setValue( newEmail );
  }

  resetPasswordModal(){
    const dialog = this.dialog.open( StoreUserRestPasswordComponent, {
      minWidth: 600,
      maxHeight: 400,
      disableClose: true,
      data: {
        "storeUserId": this.userIdForPassword
      }
    });
    dialog.afterClosed().subscribe(result => {
      if( result ){
        let payload = {
          userId: this.userIdForPassword,
          newPassword: result
        }
        console.log( payload );
        this.store.dispatch( new ResetStoreUserPassword( payload ) );        
      }
    });
  }

  openHubUserForm() {
    this.isHubUserShow = false;
    this.HubUserActive = true;
    this.resetHubForm();
  }
  hideHubUser() {
    this.isHubUserShow = true;
  }

  openStoreUserForm() {
    this.isStoreUserShow = false;
  }
  hideStoreUser() {
    this.isStoreUserShow = true;
  }

  MerchantCountryDetails(value) {
    this.merchantCountryCode = value.countryCode;
    this.merchantCountryMobileCode = value.countryMobileCode;
  }
  HubCountryDetails(value) {
    this.hubCountryCode = value.countryCode;
    this.hubCountryMobileCode = value.countryMobileCode;
  }
  MerchantActiveToggle(merchantToogle) {
    this.merchantUserActive = merchantToogle.checked;
  }
  HubActiveToggle(hubToggle) {
    this.HubUserActive = hubToggle.checked;
  }
  storeActiveToggle(storeToggle) {
    this.storeUserActive = storeToggle.checked;
  }

  ngOnDestroy() {
    if (this.subscriptionApi) {
      this.subscriptionApi.unsubscribe();
    }
  }
}
