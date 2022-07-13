import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  selected: any = 'Today';
  @ViewChild(DaterangepickerDirective, { static: true }) pickerDirective: DaterangepickerDirective;
  alwaysShowCalendars: boolean;
  picker: DaterangepickerComponent;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];

  isInvalidDate = (m: moment.Moment) =>  {
    return this.invalidDates.some(d => d.isSame(m, 'day') )
  }

  //Bar Chart
  public sBusinessChartOptions: ChartOptions = {
    responsive: true,
  };
  public sBusinessColors: any[] = [
  { 
    backgroundColor:["#FF7360", "#FF7360", "#FF7360", "#FF7360", "#FF7360", "#FF7360", "#FF7360", "#FF7360", "#FF7360", "#FF7360"] 
  }];

  public sBusinessChartLabels: Label[] = ['Grocery Platform', 'Grocery Mart', 'Grofers', 'Kaka Canteen', 'Store from web', 'Grocery Platform', 'Grocery Mart', 'Grofers', 'Kaka Canteen', 'Store from web'];
  public sBusinessChartType: ChartType = 'bar';
  public sBusinessChartLegend = true;
  public sBusinessChartPlugins = [];

  public sBusinessChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56], label: 'Order No.'}
  ];


  public sRegionChartOptions: ChartOptions = {
    responsive: true,
  };
  public sRegionColors: any[] = [
  { 
    backgroundColor:["#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE"] 
  }];
  public sRegionChartLabels: Label[] = ['Kaka Canteen', 'Grofers', 'Grocery Mart', 'Grocery Platform', 'Store from web', 'Kaka Canteen', 'Grofers', 'Grocery Mart', 'Grocery Platform', 'Store from web'];
  public sRegionChartType: ChartType = 'bar';
  public sRegionChartLegend = true;
  public sRegionChartPlugins = [];

  public sRegionChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56], label: 'Order No.' }
  ];


  // Pie
  public paymentChartOptions = this.createOptions();
  public paymentChartLabels: Label[] = [['PREPAID'], ['COD']];
  public paymentChartData: SingleDataSet = [300, 500];
  public paymentChartType: ChartType = 'pie';
  public paymentChartLegend = true;
  public paymentChartPlugins = [pluginLabels];

  public deliveryTypeChartOptions = this.createOptions();
  public deliveryTypeChartLabels: Label[] = [['DELIVERY'], ['PICKUP']];
  public deliveryTypeChartData: SingleDataSet = [300, 500];
  public deliveryTypeChartType: ChartType = 'pie';
  public deliveryTypeChartLegend = true;
  public deliveryTypeChartPlugins = [pluginLabels];

  public orderTypeChartOptions = this.createOptions();
  public orderTypeChartLabels: Label[] = [['ORDER'], ['CANCELLED']];
  public orderTypeChartData: SingleDataSet = [300, 500];
  public orderTypeChartType: ChartType = 'pie';
  public orderTypeChartLegend = true;
  public orderTypeChartPlugins = [pluginLabels];

  constructor() { 
    this.alwaysShowCalendars = true;

    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.picker = this.pickerDirective.picker;
  }
  open(e) {
    console.log('Open Calander');
    this.pickerDirective.open(e);
  }

  private createOptions(): ChartOptions {
    return {
      responsive: true,
          maintainAspectRatio: true,
          plugins: {
              labels: {
                render: 'percentage',
                fontColor: ['white', 'green'],
                precision: 2
              }
          },
    };
  }
}
