import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumnos/alumno';
import { RFIDService } from 'src/app/services/rfid.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  alumnos: any[];
  registerForm: FormGroup;

  constructor(private rfidService: RFIDService, private fb: FormBuilder) { }

  ngOnInit() {
    this.rfidService.change.subscribe(response => {
      this.getAlumnos();
    });

    this.registerForm = this.fb.group({
      name: '',
      last_name: '',
      matricula: '',
      id_rfid: '',
    });

    this.getAlumnos();
  }

  getAlumnos() {
    this.rfidService.getAlumnos().subscribe(response => {
      this.alumnos = response;
    })
  }

  crearAlumno() {
    this.rfidService.agregarAlumno(this.registerForm.value).subscribe(response => {
      console.log('Guardado con exito: ', response);
      this.registerForm.reset();
      this.ngOnInit();
    })
  }

  //Servicio para obtener alumnos()

  editarAlumno() {

  }
  eliminarAlumno() {

  }


}
