import { NgModule } from '@angular/core';

import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './dashboard-layout/components/sidebar/sidebar.component';
import { NavbarComponent } from './dashboard-layout/components/navbar/navbar.component';

@NgModule({
  declarations: [DashboardLayoutComponent, AuthLayoutComponent],
  imports: [BrowserModule, RouterModule, SidebarComponent, NavbarComponent],
  providers: [],
  exports: [DashboardLayoutComponent, AuthLayoutComponent],
})
export class LayoutModule {}
