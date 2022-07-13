import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';

// Components
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/meterial-module';
import { NotaccessComponent } from './components/notaccess/notaccess.component';
import { AuthenticationService } from './services/_authentication.service';

@NgModule({
  declarations: [AuthLayoutComponent, LoginComponent, NotaccessComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutRoutingModule,
    MaterialModule,
  ],
  providers: [AuthenticationService],
})
export class AuthLayoutModule {}
