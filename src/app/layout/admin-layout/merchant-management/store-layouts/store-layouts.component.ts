import { Component, OnInit } from '@angular/core';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreListLayouts, PurchaseStoreLayout, GetStoreDetailsLayouts, SwitchStoreListLayoutAndPublish, SwitchStoreDeatilLayout } from '../../../../actions/merchant-management.actions';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditLayoutPopupComponent } from '../edit-layout-popup/edit-layout-popup.component';

@Component({
  selector: 'app-store-layouts',
  templateUrl: './store-layouts.component.html',
  styleUrls: ['./store-layouts.component.css']
})
export class StoreLayoutsComponent implements OnInit {
  storeId = null
  myLayouts = null
  layoutTemplates = null

  detailLayoutTemplates = null
  detailMyLayoutTemplates = null

  constructor(private store: Store<any>, public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.storeId = this.activatedRoute.snapshot.params.storeId;
    this.store.dispatch(new GetStoreListLayouts(this.storeId))
    this.store.dispatch(new GetStoreDetailsLayouts(this.storeId))

  }


  openLayoutEdit(layout_name, data, layout_id, is_default, openFor) {
    const dialogRef = this.dialog.open(EditLayoutPopupComponent, {
      width: '400px',
      panelClass: 'layout-modalbox',
      data: {
        layout_name,
        data,
        layout_id,
        storeId: this.storeId,
        is_default,
        openFor
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.store.pipe(select('merchantManagement')).subscribe(res => {
      if (res.storeListLayouts) {
        console.log(res.storeListLayouts)
        this.myLayouts = res.storeListLayouts[0]['myLayouts']
        this.layoutTemplates = res.storeListLayouts[0]['layoutTemplets']
      }
      if (res.storeDetailLayouts) {
        this.detailMyLayoutTemplates = res.storeDetailLayouts[0]['myLayouts']
        this.detailLayoutTemplates = res.storeDetailLayouts[0]['layoutTemplets']
      }
    });

  }

  purchaseLayout(id) {
    this.store.dispatch(new PurchaseStoreLayout({
      storeId: this.storeId, layoutId: id, type: "list"
    }))
  }

  getImageExtensiion(layout_name) {
    const imgExtension = ['P1003', 'P1004', 'P1005', 'P1006', 'P2003', 'P2004', 'P2005', 'P2006'].includes(layout_name) ? 'gif' : 'png';
    return imgExtension
  }

  checkApplyButton(data, is_default) {
    if (is_default == false) {
      const jsonData = JSON.parse(data)
      if (jsonData.edited_by_seller == true) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  }

  applyLayout(layout_id) {
    this.store.dispatch(new SwitchStoreListLayoutAndPublish({
      layoutId: layout_id,
      store_id: this.storeId
    }))
  }



  switchStoreLayout(layout_id) {

    this.store.dispatch(new SwitchStoreDeatilLayout({
      layoutId: layout_id,
      store_id: this.storeId
    }))
  }

}
