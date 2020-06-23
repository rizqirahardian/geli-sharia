import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { HttpService } from 'src/app/services/http/http.service';
import { Product } from 'src/app/services/models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  products: Array<Product>

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.getProduct()
  }

  getProduct() {
    this.http.getProduct().subscribe((res: any) => {
      this.products = res.datas
    })
  }

  goToProduct(str) {
    this.router.navigate([`product`], { state: { produk: str } })
  }

}
