import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorInterceptor } from './core/interceptor/http-interceptor.interceptor';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { LayoutModule } from './core/layout/layout.module';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, LayoutModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
