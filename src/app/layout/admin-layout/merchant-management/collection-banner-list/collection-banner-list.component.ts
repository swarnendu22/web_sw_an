import { Component, OnInit } from '@angular/core';
import { select, Store } from '../../../../../../node_modules/@ngrx/store';
import { 
  GetCollectionBannerList,
  DeleteCollectionBanner,
  ActionTypes
} from '../../../../actions/merchant-management.actions';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiMessageService } from 'src/app/utils/api/api-message.service';

export interface bannerData {
  id: number;
  image: string;
  collection_name: string;
  display_layout: string;
}

@Component({
  selector: 'app-collection-banner-list',
  templateUrl: './collection-banner-list.component.html',
  styleUrls: ['./collection-banner-list.component.css']
})
export class CollectionBannerListComponent implements OnInit {
  displayedColumns =
  ['image', 'collection_name', 'display_layout', 'action'];
  rowData: MatTableDataSource<bannerData>;
  collectionBannerList = [];
  itemSubscription: Subscription;
  constructor(
    private store: Store<any>,
    public dialog: MatDialog,
    private route: Router,
    private apiMessageService: ApiMessageService,
  ) {
    this.store.dispatch(new GetCollectionBannerList());
  }
  ngOnInit(): void {
    this.store
    .pipe(select('merchantManagement'))
    .subscribe(res => {
      if (res.collectionBannerList) {
        this.collectionBannerList = res.collectionBannerList;
        this.rowData = new MatTableDataSource(this.collectionBannerList);
      }
    });
  }
  editBanner(id) {
    this.route.navigate(['/merchant/edit-collection-banner/'+id]);
  }
  deleteBanner(id) {
    this.store.dispatch(new DeleteCollectionBanner(id));
    this.itemSubscription = this.apiMessageService.currentApiStatus.subscribe(data => {
      if (data.status === true && data.type == ActionTypes.deleteCollectionBanner) {
        this.store.dispatch(new GetCollectionBannerList());
      }
    });
  }
  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
  }
}
