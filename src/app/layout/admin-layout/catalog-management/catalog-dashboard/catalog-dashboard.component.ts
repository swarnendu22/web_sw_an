import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-catalog-dashboard',
  templateUrl: './catalog-dashboard.component.html',
  styleUrls: ['./catalog-dashboard.component.css']
})
export class CatalogDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  // loadMerchandise() {
  //   window.open(environment.merchantdiseUrl, '_blank');

  // }
  // loadPriceComparison() {
  //   window.open(environment.priceComparisonUrl, '_blank');

  // }

}
