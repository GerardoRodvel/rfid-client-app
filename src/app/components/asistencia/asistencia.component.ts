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

  asistencias:any[];
  // alumnos:Alumno[];
  j=0;
  asistenciaDB:Asistencia;
  nombre;
  constructor(private rfidService:RFIDService) { }

  ngOnInit() {

    this.rfidService.getAsistencias().subscribe(response=>{
      console.log(response);
      this.asistencias=response;
      this.asistenciaDB = response
      for (let i = 0; i < response.length; i++) {
        // console.log("-------------------------",response)
        const element = response[i];
        this.rfidService.getAlumnosByID(element.id_alumno).subscribe(response =>{
          console.log(response);
          this.nombre = response.name;
        })
      }
    })
    console.log(this.asistenciaDB)
  }


  obtenerAlumnos(id){
    var data;
    // console.log("----------",id)
    this.rfidService.getAlumnosByID(id).subscribe(response =>{
      console.log(response.name); 
      data = response.name
    })
    console.log(data)
    return data;
  }
}
