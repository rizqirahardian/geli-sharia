import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pembayaran',
  templateUrl: './pembayaran.component.html',
  styleUrls: ['./pembayaran.component.css']
})
export class PembayaranComponent implements OnInit {

  orderID: string

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (history.state.id) {
      this.orderID = history.state.id
    } else {
      this.orderID = localStorage.getItem('orderID')
    }
  }

  proceedPayment() {
    this.router.navigate(['panduan-pembayaran'], {
      state: { id: this.orderID}
    })
  }

}
