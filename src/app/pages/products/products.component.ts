import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner'

import { ModalDirective } from '../../directives/modal/modal.directive'
import { HttpService } from '../../services/http/http.service'
import { OrderPolis } from '../../services/models/models'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  orderPolis: OrderPolis
  orderID: string
  productID: string
  productName: string
  dob: string
  age: string
  premi: string
  manfaat: string
  minPremi: string
  maxPremi: string
  data: Array<any>
  range: any
  rangeOption: string
  manfaatDesc: string
  premiDesc: string
  periodeDesc: string
  pengecualianDesc: string
  productDesc: string

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show()

    this.orderPolis = new OrderPolis

    this.orderPolis.product = history.state.produk
    this.orderID = history.state.id
    this.productDesc = history.state.deskripsi
    if (this.orderID) {
      this.getDataById(this.orderID)
    } else {
      this.getPremi()
    }
  }

  getDataById(id) {
    this.http.getDataById(id).subscribe((res: any) => {
      this.getPremi()

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
    }, (err: any) => {
      this.spinner.hide()
      console.error(err)
    })
  }

  getPremi() {
    this.http.getPremi().subscribe((res: any) => {
      if (res.status == 'ok') {
        this.getManfaat()

        this.data = res.datas
        this.range = this.data.length - 1
        this.data.sort((a, b) => parseFloat(a.value) - parseFloat(b.value))

        this.data.forEach( obj => {
          if (obj.kode == "MAX") {
            this.maxPremi = obj.value
          } else if (obj.kode == "MIN") {
            this.minPremi = obj.value
          }
        })
      }
    }, (err: any) => {
      this.spinner.hide()
      console.error(err)
    })
  }
  
  getManfaat() {
    this.http.getManfaat().subscribe((res: any) => {
      this.spinner.hide()
      this.manfaatDesc = res.manfaatList[0].manfaat
      this.pengecualianDesc = res.manfaatList[0].pengecualian
      this.periodeDesc = res.manfaatList[0].periode

      this.premiDesc = 
      `Minimum Premi : ${this.minPremi} <br>
      Maximal Premi : ${this.maxPremi} per jiwa`

    }, (err: any) => {
      this.spinner.hide()
      console.error(err)
    })
  }

  buyProduct() {
    if (!this.orderID) {
      this.router.navigate(['data-diri'], {
        state: { productName: this.orderPolis.product, premi: this.orderPolis.premi, manfaat: this.orderPolis.manfaat}
      })
    } else {

      this.orderPolis.premi = this.orderPolis.premi.replace(/\D/g,'')
      this.orderPolis.manfaat = this.orderPolis.manfaat.replace(/\D/g,'')

      let params = {
        hubungan_ct: this.orderPolis.statusCT,
        nama_pp: this.orderPolis.namaPP,
        tanggal_lahir_pp: this.orderPolis.dobPP,
        jenis_kelamin_pp: this.orderPolis.genderPP,
        nomor_ponsel_pp: this.orderPolis.nomorTelponPP,
        email_pp: this.orderPolis.emailPP,
        no_ktp_pp: this.orderPolis.nomorKTPPP,
        provinsi: this.orderPolis.provinsi,
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

      this.http.updateIlustrasi(this.orderID, this.orderPolis.premi, this.orderPolis.manfaat).subscribe((res: any) => {
        if (res.status == 'ok') {
          this.router.navigate(['ringkasan'], { state: { orderID: this.orderID} })
        }
      })
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalDirective);
    modalRef.componentInstance.product = this.orderPolis.product
    modalRef.componentInstance.age = this.age;
    modalRef.componentInstance.premi = this.orderPolis.premi
    modalRef.componentInstance.manfaat = this.orderPolis.manfaat
  }

  onFocusCurrency(event) {
    event.target.value = event.target.value.replace(/\D/g,'')
  }
  
  calculateAge(birthday) { // birthday is a date
    let str = `${birthday.year}-${birthday.month}-${birthday.day}`
    let dob = new Date(str)
    let ageDifMs = Date.now() - dob.getTime()
    let ageDate = new Date(ageDifMs) // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  calculateManfaat(option) {
    this.orderPolis.premi = this.data[option].value.toString()
    this.orderPolis.manfaat = this.data[option].up.toString()
    console.log(this.orderPolis.premi)
  }

}