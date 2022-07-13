import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-attributes-page',
  templateUrl: './attributes-page.component.html',
  styleUrls: ['./attributes-page.component.css']
})
export class AttributesPageComponent implements OnInit {
  tabIndex = 0;
  routesArr = [
    '/store/product-attribute',
    '/store/product-attribute/attribute-group',
    '/store/product-attribute/attribute-set',
  ]
  constructor(private router: Router) { }

  ngOnInit() {
    const found = this.routesArr.findIndex(x => x === this.router.url)
    if (found >= 0) {
      this.tabIndex = found
    }
  }
  route(event) {
    console.log('click', event);
    const tabindex = event.index;
    this.tabIndex = tabindex
    this.router.navigate([this.routesArr[this.tabIndex]]);
  }
}
