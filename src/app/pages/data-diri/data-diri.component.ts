import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { OrderPolis } from '../../services/models/models'
import { HttpService } from '../../services/http/http.service'
import { Config } from 'src/app/config';

@Component({
  selector: 'app-data-diri',
  templateUrl: './data-diri.component.html',
  styleUrls: ['./data-diri.component.css'],
  providers: [Config]
})
export class DataDiriComponent implements OnInit {

  @Input() otpResult = false
  orderPolis: OrderPolis
  orderID: string
  intNumber: string
  nomorPemegangPolis: string
  status:string
  provinsi: any
  deklarasikesehatan: boolean
  syaratdanketentuan: boolean
  onOtp: boolean

  constructor(
    private router: Router,
    private http: HttpService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.orderPolis = new OrderPolis
    
    this.orderPolis.product = history.state.productName
    this.orderPolis.premi = history.state.premi
    this.orderPolis.manfaat = history.state.manfaat
    this.orderPolis.statusCT = 'Diri Sendiri'

    this.onOtp = false

    this.orderID = history.state.id
    if (this.orderID) {
      this.getDataById(this.orderID)
    } else {
      this.getProvinsi()
    }
  }

  getDataById(id) {
    this.http.getDataById(id).subscribe((res: any) => {
      let result = res.datas[0]
      this.orderPolis.statusCT = result.hubungan_ct
      this.orderPolis.namaPP = result.nama_pp
      this.orderPolis.dobPP = result.tanggal_lahir_pp
      this.orderPolis.genderPP = result.genderPP
      this.orderPolis.nomorTelponPP = result.nomorTelponPP
      this.orderPolis.emailPP = result.email_pp
      this.orderPolis.nomorKTPPP = result.nomorKTPPP
      this.orderPolis.provinsi = result.provinsi
      this.orderPolis.statusPM = result.penerima_manfaat
      this.orderPolis.namaPM = result.namaPM
      this.orderPolis.nomorKTPPM = result.no_ktp_pm
      this.orderPolis.dobPM = result.tanggal_lahir_pm
      this.orderPolis.genderPM = result.jenis_kelamin_pm
      this.orderPolis.namaBank = result.nama_bank
      this.orderPolis.nomorBank = result.nomor_rekening
      this.orderPolis.pemilikBank = result.nama_pemilik_rekening
      this.orderPolis.namaCT = result.nama_ct
      this.orderPolis.nomorKTPCT = result.no_ktp_ct
      this.orderPolis.dobCT = result.tanggal_lahir_ct
      this.orderPolis.genderCT = result.jenis_kelamin_ct
      this.orderPolis.premi = result.premi
      this.orderPolis.manfaat = result.uang_pertanggungan
      this.orderPolis.product = result.produk

      this.getProvinsi()
    })
  }

  getProvinsi() {
    this.http.getProvinsi().subscribe((res: any) => {
      this.provinsi = res.datas
    })
  }

  openModal(content, id) {
    this.modalService.open(content).result.then(() => {
      if (id == 0) this.deklarasikesehatan = true 
      else this.syaratdanketentuan = true
    })
  }

  submit() {
    this.orderPolis.nomorTelponPP = this.intNumber + this.nomorPemegangPolis
    this.onOtp = true
    console.log(this.orderPolis)
  }

  onResult(res) {
    console.log('otp result', res)
    let params = {
      hubungan_ct: this.orderPolis.statusCT,
      nama_pp: this.orderPolis.namaPP,
      tanggal_lahir_pp: this.orderPolis.dobPP,
      jenis_kelamin_pp: this.orderPolis.genderPP,
      nomor_ponsel_pp: this.orderPolis.nomorTelponPP,
      email_pp: this.orderPolis.emailPP,
      no_ktp_pp: this.orderPolis.nomorKTPPP,
      penerima_manfaat: this.orderPolis.statusPM,
      nama_pm: this.orderPolis.namaPM,
      no_ktp_pm: this.orderPolis.nomorKTPPM,
      tanggal_lahir_pm: this.orderPolis.dobPM,
      jenis_kelamin_pm: this.orderPolis.genderPM,
      nama_bank: this.orderPolis.namaBank,
      nomor_rekening: this.orderPolis.nomorBank,
      nama_pemilik_rekening: this.orderPolis.pemilikBank,
      nama_ct: this.orderPolis.namaCT,
      no_ktp_ct: this.orderPolis.nomorKTPCT,
      tanggal_lahir_ct: this.orderPolis.dobCT,
      jenis_kelamin_ct: this.orderPolis.genderCT,
      premi: this.orderPolis.premi,
      uang_pertanggungan: this.orderPolis.manfaat,
      produk: this.orderPolis.product
    }
    if (res) {
      this.http.submitData(params).subscribe((res: any) => {
        if (res.status == 'ok') {
          localStorage.setItem('orderID', res.datas[0].id)
          this.router.navigate(['ringkasan'], {
            state: { orderID: res.datas[0].id}
          })
        }
      }, err => {
        console.log(err)
      })
    }
  }

}
