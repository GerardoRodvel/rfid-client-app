import { Component, OnInit } from '@angular/core';
import { RFIDService } from 'src/app/services/rfid.service';
import { Alumno } from 'src/app/models/alumnos/alumno';
import { Asistencia } from 'src/app/models/asistencias/asistencia';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  asistencias: any[];
  alumnos: any[];
  j = 0;

  nombre;
  constructor(private rfidService: RFIDService) { }

  ngOnInit() {
    // this.listenChanges();
    this.getAsistencias();
  }

  listenChanges() {
    this.rfidService.change.subscribe(response => {
      this.getAsistencias();
    })
  }

  getAsistencias() {
    this.rfidService.getAsistencias().subscribe(response => {
      this.asistencias = response;
    })
  }


}
