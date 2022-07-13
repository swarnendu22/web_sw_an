import { Component, OnInit } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-disable-overlay',
  template: `
    <div
      class="ag-overlay-loading-center"
      style="background-color: lightsteelblue;"
    >
      Click Edit Button to Continue
    </div>
  `,
  styleUrls: ['./disable-overlay.component.css'],
})
export class DisableOverlayComponent
  implements OnInit, ILoadingOverlayAngularComp {
  private params: any;
  agInit(params): void {
    this.params = params;
  }
  constructor() {}

  ngOnInit() {}
}
