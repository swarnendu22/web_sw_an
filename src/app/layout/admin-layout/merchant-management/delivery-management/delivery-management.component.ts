import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CreateStoreDeliveryPartner, DeleteDeliveryPartner, GetStoreDeliveryPartner, ActionTypes, UpdateDeliveryPartner, GetDeliverCompanyList } from 'src/app/actions/merchant-management.actions';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDeliveryPartnerComponent } from '../edit-delivery-partner/edit-delivery-partner.component';

@Component({
  selector: 'app-delivery-management',
  templateUrl: './delivery-management.component.html',
  styleUrls: ['./delivery-management.component.css']
})
export class DeliveryManagementComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private apiMessageService: ApiMessageService,
    public dialog: MatDialog
  ) {

    this.store.dispatch( new GetDeliverCompanyList({ }));

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeDeliveryPartnerList) {
        this.deliveryPartnerListData = res.storeDeliveryPartnerList;
        this.dataSource = new MatTableDataSource( res.storeDeliveryPartnerList );
      }
      if( res.addedStoreDeliverylist ){
        console.log( res.addedStoreDeliverylist )
      } 
      if( res.delivereyComapnyList){
        this.deliveryComapnyLists = res.delivereyComapnyList;
      }
    });

   }

  @Input() public storeId;
  subscriptionApi: Subscription;

  ngOnInit(): void {    
    this.getStoreDeliveryPartnerList();    
  }
  tabIndex:number = 0;
  deliveryPartnerListData: [] = [];
  deliveryComapnyLists: any;
  deliveryPartner: string;

  routeTab(event) {
    const tabindex = event.index;
    this.tabIndex = tabindex;
  }

  displayedColumns: string[] = ['id', 'delivery_partner', 'Actions'];
  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStoreDeliveryPartnerList(){
    this.store.dispatch(new GetStoreDeliveryPartner( { storeId: this.storeId} ));
  }

  addDeliveryPartner(){
    let payload = {
      "store_id": this.storeId,
      "delivery_partner": this.deliveryPartner
    }
    this.store.dispatch( new CreateStoreDeliveryPartner( payload ) );
    this.subscriptionApi = this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ==  ActionTypes.createStoreDeliverPartner ) {
        this.getStoreDeliveryPartnerList();
        this.deliveryPartner = "";
      }
    });
  }

  deleteDeliveryPartner( element ){
    this.store.dispatch( new DeleteDeliveryPartner({ id: element.id }) );
    this.apiMessageService.currentApiStatus.subscribe((data:any) => {
      if (data.status === true && data.type ===  ActionTypes.deleteDeliveryPatner ) {
        this.getStoreDeliveryPartnerList();
      }
    });
  }

  editDeliveryPartner( element ){
    const dialog = this.dialog.open( EditDeliveryPartnerComponent, {
      maxWidth: 500,
      disableClose: true,
      data: {
        id: element.id,
        storeId: this.storeId
      }
    });

    dialog.afterClosed().subscribe(result => {
      if(result != ""){
        console.log( result );
        let sendData = {
          id: element.id,
          payload: {
            store_id: this.storeId,
            delivery_partner: result.newDeliveryPartner
          }
        }
        this.store.dispatch( new UpdateDeliveryPartner( sendData ));
        this.apiMessageService.currentApiStatus.subscribe((data:any) => {
          if (data.status === true && data.type ===  ActionTypes.updateDeliveryPartner ) {
            this.getStoreDeliveryPartnerList();
          }
        });
        
      }      
    });
  }

}
