import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../../services/http/http.service'

@Component({
  selector: 'app-ringkasan',
  templateUrl: './ringkasan.component.html',
  styleUrls: ['./ringkasan.component.css']
})
export class RingkasanComponent implements OnInit {

  orderID: string
  productName: string
  premi: string
  manfaat: string

  constructor(
    private http: HttpService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()

    if (history.state.orderID) {
      this.orderID = history.state.orderID
    } else {
      this.orderID = localStorage.getItem('orderID')
    }

    this.getDataById(this.orderID)
  }

  getDataById(id) {
    this.http.getDataById(id).subscribe((res: any) => {
      this.spinner.hide()
      this.productName = res.datas[0].produk
      this.premi = res.datas[0].premi
      this.manfaat = res.datas[0].uang_pertanggungan
      this.orderID = res.datas[0].id
      console.log(res)
    })
  }

  goToProduct() {
    this.router.navigate(['product'], {
      state: { productName: this.productName, premi: this.premi, manfaat: this.manfaat, id: this.orderID}
    })
  }

  goToDataDiri() {
    this.router.navigate(['data-diri'], {
      state: { id: this.orderID}
    })
  }
  
  goToPembayaran() {
    this.router.navigate(['pembayaran'], {
      state: { id: this.orderID}
    })
  }
}
