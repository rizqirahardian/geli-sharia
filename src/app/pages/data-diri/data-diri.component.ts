import { Component, OnInit, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { BeliPolis } from '../../services/models/models'

@Component({
  selector: 'app-data-diri',
  templateUrl: './data-diri.component.html',
  styleUrls: ['./data-diri.component.css']
})
export class DataDiriComponent implements OnInit {

  @Input() otpResult = false
  beliPolis: BeliPolis
  intNumber: string
  nomorPemegangPolis: string
  status:string
  deklarasikesehatan: boolean
  syaratdanketentuan: boolean
  onOtp: boolean

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.beliPolis = new BeliPolis
    
    this.beliPolis.product = history.state.productName
    this.beliPolis.premi = history.state.premi
    this.beliPolis.manfaat = history.state.manfaat
    this.beliPolis.statusCT = 'Diri Sendiri'

    this.onOtp = false
  }

  openModal(content, id) {
    this.modalService.open(content).result.then(() => {
      if (id == 0) this.deklarasikesehatan = true 
      else this.syaratdanketentuan = true
    })
  }

  submit() {
    this.beliPolis.nomorTelponPP = this.intNumber + this.nomorPemegangPolis
    this.onOtp = true
    console.log(this.beliPolis)
  }

  onResult(res) {
    console.log('otp result', res)
  }

}
