import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router'

import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { NgxSpinnerService } from 'ngx-spinner';

import { OrderPolis } from '../../services/models/models'
import { HttpService } from '../../services/http/http.service'
import { Modal2Directive } from '../../directives/modal2/modal2.directive'
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
  status: string
  provinsi: any
  deklarasikesehatan: boolean
  syaratdanketentuan: boolean
  onOtp: boolean
  nullField: string

  @ViewChild('validasi', { static: false }) modalContent: TemplateRef<any>

  constructor(
    private router: Router,
    private http: HttpService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.spinner.show()

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
    this.http.getProvinsi().subscribe((res: any) => {
      this.provinsi = res.datas
      this.http.getDataById(id).subscribe((res: any) => {
        this.spinner.hide()

        let result = res.datas[0]
        if (result.nomor_ponsel) {
          this.intNumber = result.nomor_ponsel.substring(0, 3)
          this.nomorPemegangPolis = result.nomor_ponsel.substring(3, result.nomor_ponsel.length - 1)
        }

        this.orderPolis.id = result.id
        this.orderPolis.statusCT = result.hubungan_ct
        this.orderPolis.namaPP = result.nama_pp
        this.orderPolis.dobPP = result.tanggal_lahir
        this.orderPolis.genderPP = result.jenis_kelamin
        this.orderPolis.nomorTelponPP = result.nomor_telpon
        this.orderPolis.emailPP = result.email
        this.orderPolis.nomorKTPPP = result.nomor_ktp
        this.orderPolis.provinsi = result.provinsi
        this.orderPolis.statusPM = result.penerima_manfaat
        this.orderPolis.namaPM = result.nama_pm
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

        this.orderPolis.dobPP = this.setDate(this.orderPolis.dobPP)
        this.orderPolis.dobPM = this.setDate(this.orderPolis.dobPM)
        this.orderPolis.dobCT = this.setDate(this.orderPolis.dobCT)
      })
    })
  }

  setDate(variable) {
    let split = variable.split('-')
    return variable = new NgbDate(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]))
  }

  getProvinsi() {
    this.http.getProvinsi().subscribe((res: any) => {
      this.spinner.hide()
      this.provinsi = res.datas
    })
  }

  openModal(content, id) {
    this.modalService.open(content).result.then(() => {
      if (id == 0) this.deklarasikesehatan = true
      else if (id == 1) this.syaratdanketentuan = true
    })
  }

  submit() {
    this.orderPolis.nomorTelponPP = this.intNumber + this.nomorPemegangPolis
    this.validateInput()
  }

  onResult(res) {
    let params = {
      hubungan_ct: this.orderPolis.statusCT ? this.orderPolis.statusCT : this.orderPolis.statusCT = '',
      nama_pp: this.orderPolis.namaPP ? this.orderPolis.namaPP : this.orderPolis.namaPP = '',
      tanggal_lahir_pp: this.orderPolis.dobPP ? this.orderPolis.dobPP : this.orderPolis.dobPP = '',
      jenis_kelamin_pp: this.orderPolis.genderPP ? this.orderPolis.genderPP : this.orderPolis.genderPP = '',
      nomor_ponsel_pp: this.orderPolis.nomorTelponPP ? this.orderPolis.nomorTelponPP : this.orderPolis.nomorTelponPP = '',
      email_pp: this.orderPolis.emailPP ? this.orderPolis.emailPP : this.orderPolis.emailPP = '',
      no_ktp_pp: this.orderPolis.nomorKTPPP ? this.orderPolis.nomorKTPPP : this.orderPolis.nomorKTPPP = '',
      provinsi: this.orderPolis.provinsi ? this.orderPolis.provinsi : this.orderPolis.provinsi = '',
      penerima_manfaat: this.orderPolis.statusPM ? this.orderPolis.statusPM : this.orderPolis.statusPM = '',
      nama_pm: this.orderPolis.namaPM ? this.orderPolis.namaPM : this.orderPolis.namaPM = '',
      no_ktp_pm: this.orderPolis.nomorKTPPM ? this.orderPolis.nomorKTPPM : this.orderPolis.nomorKTPPM = '',
      tanggal_lahir_pm: this.orderPolis.dobPM ? this.orderPolis.dobPM : this.orderPolis.dobPM = '',
      jenis_kelamin_pm: this.orderPolis.genderPM ? this.orderPolis.genderPM : this.orderPolis.genderPM = '',
      nama_bank: this.orderPolis.namaBank ? this.orderPolis.namaBank : this.orderPolis.namaBank = '',
      nomor_rekening: this.orderPolis.nomorBank ? this.orderPolis.nomorBank : this.orderPolis.nomorBank = '',
      nama_pemilik_rekening: this.orderPolis.pemilikBank ? this.orderPolis.pemilikBank : this.orderPolis.pemilikBank = '',
      nama_ct: this.orderPolis.namaCT ? this.orderPolis.namaCT : this.orderPolis.namaCT = '',
      no_ktp_ct: this.orderPolis.nomorKTPCT ? this.orderPolis.nomorKTPCT : this.orderPolis.nomorKTPCT = '',
      tanggal_lahir_ct: this.orderPolis.dobCT ? this.orderPolis.dobCT : this.orderPolis.dobCT = '',
      jenis_kelamin_ct: this.orderPolis.genderCT ? this.orderPolis.genderCT : this.orderPolis.genderCT = '',
      premi: this.orderPolis.premi ? this.orderPolis.premi : this.orderPolis.premi = '',
      uang_pertanggungan: this.orderPolis.manfaat ? this.orderPolis.manfaat : this.orderPolis.manfaat = '',
      produk: this.orderPolis.product ? this.orderPolis.product : this.orderPolis.product = ''
    }
    if (res) {
      this.spinner.show()

      if (this.orderPolis.id) {
        this.http.updateData(params, this.orderPolis.id).subscribe((res: any) => {
          this.spinner.hide()
          if (res.status == 'ok') {
            localStorage.setItem('orderID', this.orderPolis.id)
            this.router.navigate(['ringkasan'], {
              state: { orderID: this.orderPolis.id }
            })
          }
        }, err => {
          console.log(err)
        })
      } else {
        this.http.submitData(params).subscribe((res: any) => {
          this.spinner.hide()
          if (res.status == 'ok') {
            localStorage.setItem('orderID', res.datas[0].id)
            this.router.navigate(['ringkasan'], {
              state: { orderID: res.datas[0].id }
            })
          }
        }, err => {
          console.log(err)
        })
      }
    }
  }

  validateInput() {
    if (this.orderPolis.statusCT == 'Diri Sendiri') {
      this.orderPolis.namaPP = this.orderPolis.namaCT
      this.orderPolis.dobPP = this.orderPolis.dobCT
      this.orderPolis.genderPP = this.orderPolis.genderCT
      this.orderPolis.nomorKTPPP = this.orderPolis.nomorKTPCT
    }
    if (!this.orderPolis.statusCT) {
      this.openValidationModal('Hubungan Calon Tertanggung')
    } else if (!this.orderPolis.namaPP) {
      this.openValidationModal('Nama Pemegang Polis')
    } else if (!this.orderPolis.dobPP) {
      this.openModal2('Silahkan Isi Tanggal Lahir Pemegang Polis')
    } else if (!this.orderPolis.genderPP) {
      this.openModal2('Silahkan Isi Jenis Kelamin Pemegang Polis')
    } else if (!this.orderPolis.nomorTelponPP) {
      this.openModal2('Silahkan Isi Nomor Ponsel Pemegang Polis')
    } else if (!this.orderPolis.nomorKTPPP) {
      this.openModal2('Silahkan Isi Nomor KTP Pemegang Polis')
    } else if (!this.orderPolis.statusPM) {
      this.openModal2('Silahkan Isi Hubungan Penerima Manfaat')
    } else if (!this.orderPolis.nomorKTPPM) {
      this.openModal2('Silahkan Isi Nomor KTP/Identitas Penerima Manfaat')
    } else if (!this.orderPolis.dobPM) {
      this.openModal2('Silahkan Isi Tanggal Lahir Penerima Manfaat')
    } else if (!this.orderPolis.genderPM) {
      this.openModal2('Silahkan Isi Jenis Kelamin Penerima Manfaat')
    } else if (!this.orderPolis.namaBank) {
      this.openModal2('Silahkan Isi Nama Bank')
    } else if (!this.orderPolis.nomorBank) {
      this.openModal2('Silahkan Isi Nomor Rekening Bank')
    } else if (!this.orderPolis.pemilikBank) {
      this.openModal2('Silahkan Isi Nama Pemilik Rekening')
    } else if (!this.orderPolis.namaCT) {
      this.openModal2('Silahkan Isi Nama Calon Tertanggung')
    } else if (!this.orderPolis.dobCT) {
      this.openModal2('Silahkan Isi Tanggal Lahir Calon Tertanggung')
    } else if (!this.orderPolis.genderCT) {
      this.openModal2('Silahkan Isi Jenis Kelamin Calon Tertanggung')
    } else if (!this.orderPolis.nomorKTPCT) {
      this.openModal2('Silahkan Isi Nomor KTP Calon Tertanggung')
    } else {
      let dobPP = JSON.parse(JSON.stringify(this.orderPolis.dobPP))
      let dobCT = JSON.parse(JSON.stringify(this.orderPolis.dobCT))
      let dobPM = JSON.parse(JSON.stringify(this.orderPolis.dobPM))

      this.orderPolis.dobPP = `${dobPP.year}-${dobPP.month}-${dobPP.day}`
      this.orderPolis.dobCT = `${dobCT.year}-${dobCT.month}-${dobCT.day}`
      this.orderPolis.dobPM = `${dobPM.year}-${dobPM.month}-${dobPM.day}`

      this.onOtp = true
    }
  }

  openValidationModal(nullField) {
    this.nullField = nullField
    this.modalService.open(this.modalContent)
  }

  openModal2(nullField) {
    const modalRef = this.modalService.open(Modal2Directive)
    modalRef.componentInstance.nullField = nullField
  }

}