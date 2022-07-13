import { Component, OnInit, Output } from '@angular/core';
import { AgGridOptions } from 'src/app/utils/agGridOption/ag-grid-option';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { BroadCastMessageDeliveryBoys, GetRegionsByCountryCode, GetZoneByRegionCode } from 'src/app/actions/delivery-boy-management.action';
import { EventEmitter } from 'protractor';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-delivery-boy-dashboard',
  templateUrl: './delivery-boy-dashboard.component.html',
  styleUrls: ['./delivery-boy-dashboard.component.css']
})
export class DeliveryBoyDashboardComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  viewToggle = 'list'
  regionList = [];
  zoneList = [];
  vehicleType: null;
  area: null;
  state_name: null;
  message = '';
  activeDE = true;
  inActiveDE = true;
  freeDE = true;
  occupied = true;
  filterForm: FormGroup
  totalDeliveryBoys = []
  payLoadForSearch = {
    search: '',
    state_name: '',
    vehicle_type: null,
    area: '',
    active_inactive: [true, false],
    availability_status: ['IDEAL', 'CHECK-IN', 'OCCUPIED'],
    // active: true,
    // inactive: true,
    // free: true,
    // occupied: true
  };
  messageControl = new FormControl('', Validators.required)
  constructor(private store: Store<any>, private apiMsgService: ApiMessageService) {

    this.filterForm = new FormGroup({
      search: new FormControl(),
      state_name: new FormControl(),
      vehicle_type: new FormControl(),
      area: new FormControl(''),
      active_inactive: new FormArray([
        new FormControl(true),
        new FormControl(false)
      ]),
      availability_status: new FormArray([
        new FormControl('IDEAL'),
        new FormControl('CHECK-IN'),
        new FormControl('OCCUPIED')
      ]),
    })



  }
  ngOnInit() {
    this.store.dispatch(new GetRegionsByCountryCode());
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.regionsList) {
          console.log(res.regionsList);
          this.regionList = res.regionsList;
        }
      });
    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.zoneList) {
          console.log(res.zoneList);
          this.zoneList = res.zoneList;
        }
      });
    this.apiMsgService.changeApiStatus({
      type: 'SEARCH_PAYLOAD_DE_DASHBOARD',
      status: true,
      payload: this.filterForm.value
    });

    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        if (res.deliveryBoysByStatus) {
          console.log(res.deliveryBoysByStatus)
          this.totalDeliveryBoys = []
          const totalDeliveryBoys = res.deliveryBoysByStatus.delivery_boys;
          totalDeliveryBoys.forEach(item => {
            this.totalDeliveryBoys.push(item['id'])
          });
        }
      });
  }


  selectRegion(e) {
    this.filterForm.get('area').patchValue('');
    // this.state_name = e.value.regionName;
    this.payLoadForSearch['state_name'] = e.value === 'undefined' ? '' : e.value.regionName;
    this.apiMsgService.changeApiStatus({
      type: 'SEARCH_PAYLOAD_DE_DASHBOARD',
      status: true,
      payload: {
        search: this.filterForm.get('search').value,
        state_name: this.filterForm.get('state_name').value['regionName'],
        vehicle_type: this.filterForm.get('vehicle_type').value,
        area: this.filterForm.get('area').value,
        active_inactive: this.filterForm.get('active_inactive').value,
        availability_status: this.filterForm.get('availability_status').value,
      }
    });

    // tslint:disable-next-line: no-unused-expression
    e.value && this.store.dispatch(new GetZoneByRegionCode({ regionCode: e.value.regionCode }));
  }

  broadcastMessage() {
    if (this.totalDeliveryBoys.length > 0) {
      const payload = {
        ids: this.totalDeliveryBoys,
        message: this.messageControl.value
      }
      console.log('IDS', payload)
      this.store.dispatch(new BroadCastMessageDeliveryBoys(payload))
      this.apiMsgService.currentApiStatus.subscribe(data => {
        if (data.status && data.type === 'DELIVERY_BOY_BROADCAST_MESSAGE_SEND') {
          this.messageControl.reset()
        }
      })
    }
  }

  get getActiveInactiveFormArr() {
    return this.filterForm.get('active_inactive') as FormArray
  }

  get getAvailibiityStatusFormArr() {
    return this.filterForm.get('availability_status') as FormArray
  }

  changeSearchPayload(e, key) {
    if (e.value) {
      this.payLoadForSearch[key] = e.value;
      // console.log('Payload', this.payLoadForSearch[key], this.payLoadForSearch);
      this.apiMsgService.changeApiStatus({
        type: 'SEARCH_PAYLOAD_DE_DASHBOARD',
        status: true,
        payload: {
          search: this.filterForm.get('search').value,
          state_name: this.filterForm.get('state_name').value ? this.filterForm.get('state_name').value['regionName'] : '',
          vehicle_type: this.filterForm.get('vehicle_type').value,
          area: this.filterForm.get('area').value,
          active_inactive: this.filterForm.get('active_inactive').value,
          availability_status: this.filterForm.get('availability_status').value,
        }
      });
    } else {
      this.payLoadForSearch[key] = e.checked;
      console.log('`Payload`', this.filterForm.value, e.checked, key);
      const CheckBoxName = key
      switch (CheckBoxName) {
        case 'ACTIVE':
          if (e.checked) {
            this.getActiveInactiveFormArr.length > 1 ?
              this.getActiveInactiveFormArr.insert(1, new FormControl(true)) :
              this.getActiveInactiveFormArr.insert(0, new FormControl(true))
          } else {
            this.getActiveInactiveFormArr.length > 1 ?
              this.getActiveInactiveFormArr.removeAt(0) :
              this.getActiveInactiveFormArr.removeAt(0)
          }
          break;
        case 'INACTIVE':
          if (e.checked) {
            this.getActiveInactiveFormArr.length >= 1 ?
              this.getActiveInactiveFormArr.insert(1, new FormControl(false)) :
              this.getActiveInactiveFormArr.insert(0, new FormControl(false))
          } else {
            this.getActiveInactiveFormArr.length > 1 ?
              this.getActiveInactiveFormArr.removeAt(1) :
              this.getActiveInactiveFormArr.removeAt(0)
          }
          break;
        case 'IDEAL':
          if (e.checked) {
            if (this.getAvailibiityStatusFormArr.length > 1) {
              this.getAvailibiityStatusFormArr.insert(0, new FormControl(key))
              this.getAvailibiityStatusFormArr.insert(1, new FormControl('CHECK-IN'))
            } else {
              this.getAvailibiityStatusFormArr.insert(0, new FormControl(key))
              this.getAvailibiityStatusFormArr.insert(1, new FormControl('CHECK-IN'))
            }
          } else {
            if (this.getAvailibiityStatusFormArr.length === 3) {
              this.getAvailibiityStatusFormArr.removeAt(0)
              this.getAvailibiityStatusFormArr.removeAt(0)
            } else {
              this.getAvailibiityStatusFormArr.removeAt(0)
              this.getAvailibiityStatusFormArr.removeAt(0)
            }
          }
          break;
        case 'OCCUPIED':
          if (e.checked) {
            if (this.getAvailibiityStatusFormArr.length === 2) {
              this.getAvailibiityStatusFormArr.insert(2, new FormControl(key))
            } else {
              this.getAvailibiityStatusFormArr.insert(0, new FormControl(key))
            }
          } else {
            if (this.getAvailibiityStatusFormArr.length > 2) {
              this.getAvailibiityStatusFormArr.removeAt(2)
            } else {
              this.getAvailibiityStatusFormArr.removeAt(0)
            }
          }
          break;

        default:
          break;
      }
      console.log('`Filter Value`', this.filterForm.value);
      this.apiMsgService.changeApiStatus({
        type: 'SEARCH_PAYLOAD_DE_DASHBOARD',
        status: true,
        payload: {
          search: this.filterForm.get('search').value,
          state_name: this.filterForm.get('state_name').value ? this.filterForm.get('state_name').value['regionName'] : '',
          vehicle_type: this.filterForm.get('vehicle_type').value,
          area: this.filterForm.get('area').value,
          active_inactive: this.filterForm.get('active_inactive').value,
          availability_status: this.filterForm.get('availability_status').value,
        }
      });
    }
  }


  reset() {
    this.filterForm.reset();
    this.filterForm.get('active').patchValue(true)
    this.filterForm.get('inactive').patchValue(true)
    this.filterForm.get('free').patchValue(true)
    this.filterForm.get('occupied').patchValue(true)
    this.apiMsgService.changeApiStatus({
      type: 'SEARCH_PAYLOAD_DE_DASHBOARD',
      status: true,
      payload: this.filterForm.value
    });
  }

}
