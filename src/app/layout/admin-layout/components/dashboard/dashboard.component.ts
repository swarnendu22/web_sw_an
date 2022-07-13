import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Router } from '../../../../../../node_modules/@angular/router';
import { DaterangepickerComponent, DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { Store, select } from '../../../../../../node_modules/@ngrx/store';
import { GetStoreCountForDashboard, GetProductCountForDashboard, GetOrderCountForDashboard, GetStoreCompletenessCount } from '../../../../actions/merchant-management.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pendingCount = null
  approvedCount = null
  approveNoProdCount = null
  activeCount = null
  pendingProductCount = null
  outOfStockCount = null
  dailyOrders = null
  dailyTotalAmt = null
  w_orders = null
  w_totalamt = null
  m_orders = null
  m_totalamt = null
  todayDate = new Date()
  week_date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  month_date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

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

  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }

  //Bar Chart
  public sBusinessChartOptions: ChartOptions = {
    responsive: true,
  };
  public sBusinessColors: any[] = [
    {
      backgroundColor: ["#2badd8", "#2badd8", "#2badd8", "#2badd8", "#2badd8", "#2badd8", "#2badd8", "#2badd8", "#2badd8", "#2badd8"]
    }];

  public sBusinessChartLabels: Label[] = ['20', '40', '60', '80', '100'];
  public sBusinessChartType: ChartType = 'bar';
  public sBusinessChartLegend = true;
  public sBusinessChartPlugins = [];

  public sBusinessChartData: ChartDataSets[] = [
    { data: [], label: 'Completeness %' }
  ];


  // Pie
  public paymentChartOptions = this.createOptions();
  public paymentChartLabels: Label[] = [['PREPAID'], ['COD']];
  public paymentChartType: ChartType = 'pie';
  public paymentChartLegend = true;
  public paymentChartPlugins = [pluginLabels];

  public deliveryTypeChartOptions = this.createOptions();
  public deliveryTypeChartLabels: Label[] = [['DELIVERY'], ['PICKUP']];
  public deliveryTypeChartType: ChartType = 'pie';
  public deliveryTypeChartLegend = true;
  public deliveryTypeChartPlugins = [pluginLabels];

  public orderTypeChartOptions = this.createOptions();
  public orderTypeChartLabels: Label[] = [['ORDER'], ['CANCELLED']];
  public orderTypeChartType: ChartType = 'pie';
  public orderTypeChartLegend = true;
  public orderTypeChartPlugins = [pluginLabels];

  constructor(private store: Store<any>,
    private router: Router) {
    console.log('called')
    this.store.dispatch(new GetStoreCountForDashboard())
    this.store.dispatch(new GetProductCountForDashboard())
    this.store.dispatch(new GetOrderCountForDashboard())
    this.store.dispatch(new GetStoreCompletenessCount())

    this.alwaysShowCalendars = true;
  }

  ngOnInit() {

    this.store.pipe(select('merchantManagement')).subscribe(res => {
      console.log(res)
      if (res && res.storeCount) {
        this.pendingCount = res.storeCount['pendingCount']
        this.approvedCount = res.storeCount['approvedCount']
        this.approveNoProdCount = res.storeCount['approveNoProdCount']
      }
      if (res && res.productCount) {
        this.activeCount = res.productCount['activeCount']
        this.pendingProductCount = res.productCount['pendingCount']
        this.outOfStockCount = res.productCount['outOfStockCount']
      }
      if (res && res.orderCount) {
        console.log(res.orderCount)
        this.dailyOrders = res.orderCount['d_orders']
        this.dailyTotalAmt = res.orderCount['d_totalamt']
        this.w_orders = res.orderCount['w_orders']
        this.w_totalamt = res.orderCount['w_totalamt']
        this.m_orders = res.orderCount['m_orders']
        this.m_totalamt = res.orderCount['m_totalamt']
      }
      if (res && res.storeCompleteCount) {
        console.log(res.storeCompleteCount)
        this.sBusinessChartData[0].data = res.storeCompleteCount.map(e => e.totalPercent)
      }
    });

    // this.picker = this.pickerDirective.picker;
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


  
  goOrderList(filterDate) {
    this.router.navigate(['/orders/orders-list/' + filterDate])
  }
}
