import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { NgbDateStruct, NgbCalendar, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  model: NgbDateStruct
  date: {year: number, month: number}
  dob: string
  premi: string
  manfaat: string

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.orderPolis = new OrderPolis

    this.orderPolis.product = history.state.produk
    this.orderID = history.state.id
    if (this.orderID) {
      this.getDataById(this.orderID)
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
    })
  }

  buyProduct() {
    // console.log(this.orderPolis.manfaat)
    if (!this.orderID) {
      this.router.navigate(['data-diri'], {
        state: { productName: this.productName, premi: this.orderPolis.premi, manfaat: this.orderPolis.manfaat}
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

      // this.http.updateData(params, this.orderID).subscribe((res: any) => {
      //   this.router.navigate(['ringkasan'], { state: { orderID: this.orderID} })
      // })
      this.http.updateIlustrasi(this.orderID, this.orderPolis.premi, this.orderPolis.manfaat).subscribe((res: any) => {
        if (res.status == 'ok') {
          this.router.navigate(['ringkasan'], { state: { orderID: this.orderID} })
        }
      })
    }
  }

  openModal() {
    const modalRef = this.modalService.open(ModalDirective);
    modalRef.componentInstance.product = this.productName;
    modalRef.componentInstance.age = this.productName;
    modalRef.componentInstance.premi = this.premi;
    modalRef.componentInstance.manfaat = this.manfaat;
  }

}