import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './site-layout.component';
import { AndroidLayoutComponent } from './android-layout/android-layout.component';
import { IosLayoutComponent } from './ios-layout/ios-layout.component';
import { MobileBrowserComponent } from './mobile-browser/mobile-browser.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent
  },
  {
    path: 'android-layout',
    component: AndroidLayoutComponent
  },
  {
    path: 'ios-layout',
    component: IosLayoutComponent
  },
  {
    path: 'mobile-browser',
    component: MobileBrowserComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteLayoutRoutingModule { }
