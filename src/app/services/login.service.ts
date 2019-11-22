import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../app-config';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api: string = API;

  constructor(private http: HttpClient) { }

  login(params:string):Observable<any> {
    return this.http.post(`${this.api}login`, params, httpOptions );
  }


}
