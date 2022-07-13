import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ndh-store-open-link',
  template: '<a (click)="openNewTab(params.data[2])" href="javascript:void(0);">{{params.data[3]}}</a>'
})
export class NdhStoreOpenLinkComponent implements ICellRendererAngularComp {
  public params;
  agInit(params: any): void {
    this.params = params;
  }
  constructor(
  ) { }

  ngOnInit() {
  }

  openNewTab(nupc) {
    // window.location.href = "https://www.nextdoorhub.com/product/" + sku + "/show";
    let link = environment.storeFrontBaseUrl + '/product/' + nupc + '/show';
    window.open(link, '_blank');
  }

  refresh() {
    return false;
  }
}
