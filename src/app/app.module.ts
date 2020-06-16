import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { MenuComponent } from './menu/menu.component';
import { ModalDirective } from './directives/modal/modal.directive';
import { DataDiriComponent } from './pages/data-diri/data-diri.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    MenuComponent,
    ModalDirective,
    DataDiriComponent,
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
