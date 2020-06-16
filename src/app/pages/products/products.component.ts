import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { ModalDirective } from '../../directives/modal/modal.directive'
import { NgbDateStruct, NgbCalendar, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

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
    private calendar: NgbCalendar,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.productID = this.route.snapshot.paramMap.get('id')
    this.productID == '0' ? this.productName = 'Great Pro Assurance' : this.productName = 'Great Saver Assurance'
  }

  buyProduct() {
    this.router.navigate(['data-diri'], {
      state: { productName: this.productName, premi: this.premi, manfaat: this.manfaat}
    })
  }

  openModal() {
    const modalRef = this.modalService.open(ModalDirective);
    modalRef.componentInstance.product = this.productName;
    modalRef.componentInstance.age = this.productName;
    modalRef.componentInstance.premi = this.premi;
    modalRef.componentInstance.manfaat = this.manfaat;
  }

}