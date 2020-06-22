import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-konfirmasi',
  templateUrl: './konfirmasi.component.html',
  styleUrls: ['./konfirmasi.component.css'],
  providers: [NgbRatingConfig]
})
export class KonfirmasiComponent implements OnInit {

  rating: number

  constructor( ratingCnf: NgbRatingConfig ) {
    ratingCnf.max = 5;
  }

  ngOnInit() {
  }

}
