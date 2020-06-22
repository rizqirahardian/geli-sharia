import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Config } from '../../config'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Access-Control-Allow-Origin':  '*',
      // 'Authorization': 'my-auth-token'
    })
  }

  constructor(
    private http: HttpClient,
    private cnf: Config
  ) { }

  submitData(params) {
    let url = this.cnf.URL + '/geli-service-api/submit-data'
    return this.http.post(url, JSON.stringify({ params }), this.httpOptions).pipe(map(res => res))
  }

  updateData(params, id) {
    let url = this.cnf.URL + '/geli-service-api/update-data-contact?id=' + id
    return this.http.post(url, JSON.stringify({ params }), this.httpOptions).pipe(map(res => res))
  }

  updateIlustrasi(id, premi, up) {
    let url = this.cnf.URL + '/geli-service-api/update-ilustrasi?id=' + id + '&premi=' + premi + '&up=' + up
    return this.http.post(url, '', this.httpOptions).pipe(map(res => res))
  }

  getDataById(id) {
    let url = this.cnf.URL + '/geli-service-api/get-by-id?id=' + id
    return this.http.get(url, this.httpOptions).pipe(map(res => res))
  }
  
  getProvinsi() {
    let url = this.cnf.URL + '/geli-service-api/get-provinsi'
    return this.http.get(url, this.httpOptions).pipe(map(res => res))
  }
  
  getPremi() {
    // this.httpOptions.headers = this.httpOptions.headers.append('content-type', 'application/json')
    let url = this.cnf.URL + '/geli-service-api/get-premi'
    return this.http.get(url, this.httpOptions).pipe(map(res => res))
  }

  getManfaat() {
    
  }
}
