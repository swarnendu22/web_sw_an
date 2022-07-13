import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
    selector: 'app-ag-grid-material-datepicker-editor',
    template: `
      <mat-form-field>
          <input matInput [matDatepicker]="picker" [(ngModel)]="value">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      </mat-form-field>
      <mat-datepicker panelClass="ag-custom-component-popup" #picker (selectedChanged)="onSelectChange($event)"></mat-datepicker>
  `,
    styles: [
        `
          .md-form-field {
              margin-top: -16px;
          }
      `
    ]
})
export class AgMatDateFilterComponent implements OnInit, AfterViewInit {
    columnWidth: string;
    params: ICellEditorParams;
    value: string;
    @ViewChild('picker', { read: MatDatepicker, static: true }) picker: MatDatepicker<Date>;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.picker.open();
    }

    isPopup(): boolean {
        return false;
    }

    isCancelBeforeStart(): boolean {
        return false;
    }

    isCancelAfterEnd(): boolean {
        return false;
    }

    agInit(params: any): void {
        this.params = params;
        this.value = params.value;
    }

    getValue(): string {
        return this.value;
    }

    onSelectChange(e): void {
        setTimeout(function () {
            this.params.stopEditing();
        }.bind(this));
    }


}
