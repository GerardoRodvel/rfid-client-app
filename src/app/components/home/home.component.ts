import { Component, OnInit } from '@angular/core';
import { RFIDService } from 'src/app/services/rfid.service';
import { RFID } from 'src/app/models/rfid/rfid';
import { Alumno } from 'src/app/models/alumnos/alumno';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  rfids: RFID[]
  alumnos: Alumno[];

  selectedRFID: RFID;
  selectedStudent: Alumno;
  id_alumno;
  id_rfid;

  listaRFID:any = [];
  listaAlumnos:any =[];
  registerForm: FormGroup;
  registerForm2: FormGroup;
  constructor(private rfidService: RFIDService, public fb: FormBuilder, ) { }

  ngOnInit() {
    var j = 0;
    var z = 0;
    this.rfidService.getRFIDS().subscribe(response => {
      console.log(response.status)

      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if(element.status!=true){
          console.log(element);
          this.listaRFID[j] = element;
          j++;
        }
      }
      
      
      console.log(response);
    })
    
    this.rfidService.getAlumnos().subscribe(response => {
      this.alumnos = response;
      
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if(element.id_rfid==null || element.id_rfid==undefined || element.id_rfid=='' ){
          console.log(element);
          this.listaAlumnos[z] = element;
          z++;
        }
      }
    })

    this.registerForm = this.fb.group({
      id_rfid:['',],
      id_alumno :  ['', ],
      last_name : ['', ],
      matricula: ['', ],
    });

    this.registerForm2 = this.fb.group({
      id:['',],
      number_rfid :  ['', ],
      status : ['', ],
    });
  }

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);


  selectStudent(alumno: any) {
    console.log(alumno);
    this.id_alumno = alumno.id;
    this.registerForm.controls['id_rfid'].setValue(alumno.id_rfid);
    this.registerForm.controls['id_alumno'].setValue(alumno.id);
    this.registerForm.controls['last_name'].setValue(alumno.last_name);
    this.registerForm.controls['matricula'].setValue(alumno.matricula);

  }
  selectRFID(rfid) {
    console.log(rfid);
    this.selectRFID = rfid;
    this.id_rfid = rfid.id;
    this.registerForm.controls['id_rfid'].setValue(rfid.id);

    this.registerForm2.controls['id'].setValue(rfid.id);
    this.registerForm2.controls['number_rfid'].setValue(rfid.number_rfid);
    this.registerForm2.controls['status'].setValue(true);
  }

  asignar() {
    console.log(this.registerForm.value);
    this.rfidService.asignarRFIDAlumno(this.registerForm.value, this.id_alumno).subscribe(response => {
      console.log('Asigando con exito',response)
    })

    this.rfidService.changeStatusRFID(this.registerForm2.value, this.id_rfid).subscribe(response =>{
      console.log('Estatus rfid true',response)
    })

  }
}
