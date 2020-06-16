import { Component, OnInit, Input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { BeliPolis } from '../../services/models/models'
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
  beliPolis: BeliPolis
  intNumber: string
  nomorPemegangPolis: string
  status:string
  deklarasikesehatan: boolean
  syaratdanketentuan: boolean
  onOtp: boolean

  constructor(
    private http: HttpService,
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
    if (res) {
      this.http.submitData(this.beliPolis).subscribe(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    }
  }

}
