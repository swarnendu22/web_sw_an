import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IdentityVerificationModalComponent } from '../identity-verification-modal/identity-verification-modal.component';

@Component({
  selector: 'app-cell-renderer-identity-verification',
  templateUrl: './cell-renderer-identity-verification.component.html',
  styleUrls: ['./cell-renderer-identity-verification.component.css']
})
export class CellRendererIdentityVerificationComponent implements OnInit {

  modalname = null;
  data: any;
  public params: any;
  public cell: any;
  agInit(params: any): void {
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
    console.log("check::: ", this.params.colDef.type);
    this.modalname = this.params.colDef.type;
    // this.showView =
    //   this.params.data.type === 'SELECT' || this.params.data.type === 'SWATCH'
    //     ? true
    //     : false;
  }
  constructor(
    // tslint:disable-next-line: variable-name
    public _route: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  viewPop(e) {
    this.dialog.open(this.modalname, {
      panelClass: 'demo-modal',
      width: '800px',
      // width: '800px',
      // maxHeight: '500px',
      data: { payload: this.params.data },
    });
  }
}


