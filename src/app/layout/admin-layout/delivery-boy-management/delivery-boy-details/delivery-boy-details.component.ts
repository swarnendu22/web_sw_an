import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-boy-details',
  templateUrl: './delivery-boy-details.component.html',
  styleUrls: ['./delivery-boy-details.component.css']
})
export class DeliveryBoyDetailsComponent implements OnInit {
	tabIndex = 0;
  constructor() { }

  route(event) {
    console.log('click', event);
    const tabindex = event.index;
    this.tabIndex = tabindex

  }

  ngOnInit() {
  }

}
