import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../../config'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private cnf: Config
  ) { }

  submitData(params) {
    let url = this.cnf.URL + '/geli-service/submit-data'
    return this.http.post(url, JSON.stringify({ params })).pipe(map(res => res))
    // return this.http.post(url, JSON.stringify({ params })).pipe(map(res => res.json()))
    // .subscribe(result => {
    //   console.log(result)
    // }, err => {
    //   console.log(err)
    // })
  }

  // updateData(params) {
  //   let url = this.cnf.URL + '/geli-service/update-contact-data'
  //   return this.http.post(url, JSON.stringify({ params })).pipe(map(res => res.json())).subscribe(result => {
  //     console.log(result)
  //   }, err => {
  //     console.log(err)
  //   })
  // }

  // getDataById(id) {
  //   let url = this.cnf.URL + '/geli-service/get-by-id?id=' + id
  //   return this.http.get(url).pipe(map(res => res.json())).subscribe(result => {
  //     console.log(result)
  //   }, err => {
  //     console.log(err)
  //   })
  // }
}
