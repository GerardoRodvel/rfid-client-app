import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Socket } from "ngx-socket-io";
import { API } from "../app-config";
import { RFID } from "../models/rfid/rfid";
import { SocketService } from "./socket.service";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Token " + localStorage.getItem("token")
  })
};

@Injectable({
  providedIn: "root"
})
export class RFIDService {
  api: string = API;
  socket2;
  selectedRFID: RFID = new RFID();


  private render = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private socket: Socket,
    private socketService: SocketService
  ) { }

  enviarMSJ(cuerpo: string, msj: string) {
    const payload = {
      de: "Angular",
      cuerpo: cuerpo
    };
    this.socketService.emit(msj, payload);
  }

  getMessages() {
    return this.socketService.listen("mensaje-nuevo");
  }

  agregarAlumno(params: any): Observable<any> {
    return this.http.post(`${this.api}alumnos/`, params, httpOptions);
  }
  getAlumnos(): Observable<any> {
    return this.http.get(`${this.api}alumnos/`, httpOptions);
  }
  getAlumnosByID(id: any): Observable<any> {
    return this.http.get(`${this.api}alumnos/${id}`, httpOptions);
  }

  agregarRFID(params: any): Observable<any> {
    return this.http.post(`${this.api}rfids/`, params, httpOptions);
  }

  getRFIDS(): Observable<any> {
    //obtiene todo los RFIDS
    return this.http.get(`${this.api}rfids/`, httpOptions);
  }
  getRfidByNumber(id): Observable<any> {
    return this.http.get(`${this.api}rfids/number_rfid/${id}`, httpOptions);
  }

  asignarRFIDAlumno(params: any, id): Observable<any> {
    this.change.emit(this.render);
    return this.http.put(`${this.api}alumnos/${id}`, params, httpOptions);
  }
  changeStatusRFID(params: any, id): Observable<any> {
    console.log(params)
    this.change.emit(this.render);
    return this.http.put(`${this.api}rfids/${id}`, params, httpOptions);
  }

  getAsistencias(): Observable<any> {

    return this.http.get(`${this.api}asistencias/`, httpOptions);
  }
}
