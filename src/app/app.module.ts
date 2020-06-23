import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuComponent } from './menu/menu.component';
import { ModalDirective } from './directives/modal/modal.directive';
import { DataDiriComponent } from './pages/data-diri/data-diri.component';
import { OtpDirective } from './directives/otp/otp.directive';
import { RingkasanComponent } from './pages/ringkasan/ringkasan.component';
import { PembayaranComponent } from './pages/pembayaran/pembayaran.component';
import { PanduanPembayaranComponent } from './pages/panduan-pembayaran/panduan-pembayaran.component';
import { KonfirmasiComponent } from './pages/konfirmasi/konfirmasi.component';
import { Modal2Directive } from './directives/modal2/modal2.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    MenuComponent,
    ModalDirective,
    DataDiriComponent,
    OtpDirective,
    RingkasanComponent,
    PembayaranComponent,
    PanduanPembayaranComponent,
    KonfirmasiComponent,
    Modal2Directive,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalDirective, Modal2Directive]
})
export class AppModule { }
