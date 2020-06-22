import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  age: string
  premi: string
  manfaat: string
  minPremi: any
  maxPremi: any
  manfaatDesc: string

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.orderPolis = new OrderPolis

    this.orderPolis.product = history.state.produk
    this.orderID = history.state.id
    if (this.orderID) {
      this.getDataById(this.orderID)
    } else {
      this.getPremi()
    }

    this.manfaatDesc = `<p><b>Manfaat Meninggal Dunia</b></p>
    <p>
        Apabila Tertanggung meninggal dunia sebelum berakhirnya masa asuransi, maka Great Eastern
        akan
        membayarkan Uang Pertanggungan dikurangi Manfaat Hidup yang telah dibayarkan (jika ada)
        kepada
        Penerima Manfaat.
    </p>
    <p>
        Catatan:
    </p>
    <p>
        Apabila Tertanggung meninggal dunia dalam kurun waktu 2 tahun pertama Polis dan terdapat
        pernyataan yang tidak diungkap dengan benar/non-disclose oleh Tertanggung dan atau Pemegang
        Polis maka Manfaat Meninggal Dunia tifak dibayarkan. Premi yang telah dibayarkan dikurangi
        biaya-biaya(jika ada) akan dikembalikan kepada Penerima Manfaat.
    </p>

    <p><b>Manfaat Hidup</b></p>
    <p>
        Apabila Tertanggung mencapai usia 65(enam puluh lima) tahun, Great Eastern akan membayarkan
        Manfaat Hidup kepada Pemegang Polis yaitu sejumlah 100%(seratus persen) dari Premi Tunggal.
    </p>
    <p>
        Mafaat Hidup berlaku apabila Tertanggung pada saat Tanggal Mulai Asuransi kurang dari
        51(lima
        puluh satu) tahun.
    </p>

    <p><b>Manfaat Akhir Asuransi</b></p>
    <p>
        Apabila Tertanggung masih hidup sampai dengan berakhirnya masa asuransi, maka Great Eastern
        akan membayarkan Uang Pertanggungan dikurangi dengan Manfaat Hidup yang telah dibayarkan
        (jika
        ada) kepada Pemegang Polis.
    </p>`
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

  getPremi() {
    this.http.getPremi().subscribe((res: any) => {
      if (res.status == 'ok') {
        let result = res.datas
        result.forEach(obj => {
          if (obj.kode == 'MAX') {
            this.maxPremi = obj.value
          } else {
            this.minPremi = obj.value
          }
        })
      }
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
    modalRef.componentInstance.product = this.orderPolis.product
    modalRef.componentInstance.age = this.age;
    modalRef.componentInstance.premi = this.orderPolis.premi
    modalRef.componentInstance.manfaat = this.orderPolis.manfaat
  }

  onFocusCurrency(event) {
    event.target.value = event.target.value.replace(/\D/g,'')
  }

  onInputSlider(event) {
    this.orderPolis.premi = event.target.value
    console.log(this.orderPolis.premi)
    console.log(event.target.value)
  }
  
  calculateAge(birthday) { // birthday is a date
    let str = `${birthday.year}-${birthday.month}-${birthday.day}`
    let dob = new Date(str)
    let ageDifMs = Date.now() - dob.getTime()
    let ageDate = new Date(ageDifMs) // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}