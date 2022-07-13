import { Component, OnInit } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-loading-overlay',
  template: `
    <div
      class="ag-overlay-loading-center"
      style="background-color: lightsteelblue;"
    >
     Select Group Name and Attributes to Continue
    </div>
  `,
  styleUrls: ['./custom-loading-overlay.component.css'],
})
export class CustomLoadingOverlayComponent
  implements OnInit, ILoadingOverlayAngularComp {
  public params: any;
  agInit(params): void {
    this.params = params;
    console.log('Parmas loading', params);
  }
  constructor() {}

  ngOnInit() {}
}
