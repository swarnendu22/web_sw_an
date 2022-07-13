import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { GetDeliveryBoyByStatus } from 'src/app/actions/delivery-boy-management.action';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';


@Component({
  selector: 'app-delivery-boy-dashboard-mapview',
  templateUrl: './delivery-boy-dashboard-mapview.component.html',
  styleUrls: ['./delivery-boy-dashboard-mapview.component.css']
})
export class DeliveryBoyDashboardMapviewComponent implements OnInit {

  map = { lat: 22.5736, lng: 88.4372 };
  pageNo = 1;
  payLoadForSearch = {
    search: '',
    state_name: null,
    area: null,
    vehicle_type: null,
    active: true,
    inactive: true,
    free: true,
    occupied: true
  };
  isOpen = false

  deMapList: any[] = [];
  deMapForm: FormGroup;


  constructor(private store: Store<any>, private apiMsgService: ApiMessageService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.deMapForm = this._fb.group({
      mapArr: this._fb.array([])
    });
    this.apiMsgService.currentApiStatus.subscribe(data => {
      if (data.status && data.type === 'SEARCH_PAYLOAD_DE_DASHBOARD') {
        this.payLoadForSearch['state_name'] = data.payload['state_name'] ? data.payload['state_name'] : ''
        // tslint:disable-next-line: no-string-literal
        this.payLoadForSearch['vehicle_type'] = data.payload['vehicle_type'] ? data.payload['vehicle_type'] : ''
        this.payLoadForSearch['area'] = data.payload['area'] ? data.payload['area'] : ''
        this.payLoadForSearch['active_inactive'] = data.payload['active_inactive']
        this.payLoadForSearch['availability_status'] = data.payload['availability_status']

        this.store.dispatch(new GetDeliveryBoyByStatus({
          'pageNo': this.pageNo,
          'status': '',
          'requestBody': this.payLoadForSearch
        }));
        // this.payLoadForSearch = data.payload;
      }

    })

    this.store
      .pipe(select('deliveryBoyManagement'))
      .subscribe(res => {
        this.deMapList = [];
        this.getMapFormArray.clear();

        if (res.deliveryBoysByStatus) {
          const deliveryBoyList = res.deliveryBoysByStatus.delivery_boys
          deliveryBoyList.forEach(item => {
            if (item['last_seen'] !== null) {
              let vehicle_type_icon = null;
              switch (item.vehicle_type) {
                case 'Bicycle':
                  vehicle_type_icon = 'assets/img/Bicycle.png';
                  break;

                case 'Four Wheeler':
                  vehicle_type_icon = 'assets/img/Four_Wheeler.png';
                  break;

                case 'Two Wheeler':
                  vehicle_type_icon = 'assets/img/Two_Wheeler.png';
                  break;

                case 'eRiksa':
                  vehicle_type_icon = 'assets/img/eRiksa.png';
                  break;

                default:
                  break;
              }
              this.deMapList.push(item);
              this.getMapFormArray.push(new FormGroup({
                lat: new FormControl(+item.last_seen.lat),
                long: new FormControl(+item.last_seen.long),
                vehicleType: new FormControl(item.vehicle_type),
                vehicle_type_icon: new FormControl(vehicle_type_icon),
                name: new FormControl(item.name),
                registration_number: new FormControl(item.registration_number),
                is_live: new FormControl(item.is_live),
                phone: new FormControl(item.phone),
              }))
            }
          });
          console.log('CALLED', this.getMapFormArray.value, deliveryBoyList);
        }
      });

  }

  get getMapFormArray() {
    return this.deMapForm.get('mapArr') as FormArray;
  }


  markerDragEnd(map, event) {
    console.log('Map, Events', map, event);
    this.map = { lat: +event.coords.lat, lng: +event.coords.lng };
  }

  showInfo(e) {
    console.log('E')
    this.isOpen = !this.isOpen
  }

}
