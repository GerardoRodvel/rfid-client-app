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
  alumnos:any[];


  registerForm: FormGroup;
  constructor(private rfidService: RFIDService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.alumnos.push( 
    //   {id:123, name:'gerardo' ,matricula:213, id_RFID:1233}
    //   )


      this.registerForm = this.fb.group({
        name:'',
        last_name:'',
        matricula:'',
        id_rfid:'',
      });

      this.getAlumnos();
  }

  getAlumnos(){
    this.rfidService.getAlumnos().subscribe(response =>{
      this.alumnos = response;
      console.log(this.alumnos)
      
    })
  }

  crearAlumno(){
    this.rfidService.agregarAlumno(this.registerForm.value).subscribe(response =>{
      console.log('Guardado con exito: ',response);
    })
  }

  //Servicio para obtener alumnos()

  editarAlumno(){

  }
  eliminarAlumno(){
    
  }

  


}
