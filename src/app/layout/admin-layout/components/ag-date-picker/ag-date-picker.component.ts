import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { AgEditorComponent } from 'ag-grid-angular';
import { MatDatepicker } from '@angular/material/datepicker';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';


@Component({
  selector: 'app-ag-date-picker',
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
  `],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})


export class AgDatePickerComponent implements OnInit, AgEditorComponent, AfterViewInit {

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
