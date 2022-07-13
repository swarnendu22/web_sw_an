import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-grid-logo-viewer',
  template: `
  <img *ngIf="storeLogoUrl" [src]="storeLogoUrl" />
  `,
  styleUrls: ['./grid-logo-viewer.component.css']
})
export class GridLogoViewerComponent implements ICellRendererAngularComp {

  constructor() { }

  public params:any;
  public storeLogoUrl:string;

  agInit(params: any) {
    this.params = params;
    let {storeLogoUrl} = this.params.data;
    if(storeLogoUrl && storeLogoUrl.indexOf('https')==0){
      let img = "";
      let x = storeLogoUrl.split('/');
        if (x.length >= 3) {
        if (x[2].includes('ndhbucket'))
        x[2] = 'ndh.imgix.net';
        img = x.join('/');
        img = `${img}?w=40&h=40`
        this.storeLogoUrl = img;
      }
    }
    
  }


  refresh(param:any) {
    return false;
  }

 

}
