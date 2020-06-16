import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { ProductsComponent } from './pages/products/products.component'
import { DataDiriComponent } from './pages/data-diri/data-diri.component'

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '404', redirectTo: 'dashboard'},
  {path: '', component: MenuComponent, children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'product/:id', component: ProductsComponent},
    {path: 'data-diri', component: DataDiriComponent},
  ]},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
