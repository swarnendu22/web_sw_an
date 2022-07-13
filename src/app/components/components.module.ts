import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { MaterialModule } from '../meterial-module';

@NgModule({
  declarations: [ComponentsComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MaterialModule
  ]
})
export class ComponentsModule { }
