import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { HttpService } from '../../services/http/http.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-panduan-pembayaran',
  templateUrl: './panduan-pembayaran.component.html',
  styleUrls: ['./panduan-pembayaran.component.css']
})
export class PanduanPembayaranComponent implements OnInit {

  orderID: string
  premi: string

  constructor(
    private router: Router,    
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()

    if (history.state.id) {
      this.orderID = history.state.id
    } else {
      this.orderID = localStorage.getItem('orderID')
    }

    this.getDataById(this.orderID)
  }

  getDataById(id) {
    this.http.getDataById(id).subscribe((res: any) => {
      this.spinner.hide()
      this.premi = res.datas[0].premi
      console.log(res)
    })
  }

}
