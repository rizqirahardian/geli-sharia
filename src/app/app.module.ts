import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import  { createCustomElement } from '@angular/elements';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuComponent } from './menu/menu.component';
import { ModalDirective } from './directives/modal/modal.directive';
import { DataDiriComponent } from './pages/data-diri/data-diri.component';
import { OtpDirective } from './directives/otp/otp.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    MenuComponent,
    ModalDirective,
    DataDiriComponent,
    OtpDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalDirective]
})
export class AppModule { }
