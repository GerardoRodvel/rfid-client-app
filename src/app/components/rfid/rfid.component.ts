import { Component, OnInit,ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RFIDService } from '../../services/rfid.service'
import { RFID } from 'src/app/models/rfid/rfid';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-rfid',
  templateUrl: './rfid.component.html',
  styleUrls: ['./rfid.component.css']
})
export class RfidComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup; 
  registerForm2: FormGroup; 
  rfids:RFID []
  rfid;
  id_rfid;
  selectedRFID: RFID;
  alumnos:any[];
  listaAlumnos:any =[];
  id_alumno;


  @ViewChild("modal5", { static: true }) modal5: ElementRef;

  mensajesSubscription: Subscription
  mensajes: any[] = [];

  constructor(public rfidService: RFIDService,
    public fb: FormBuilder,
    private socektService: SocketService,
    private renderer: Renderer2

    ) {

  
   }

  ngOnInit() {
    var z = 0;

    this.rfidService.getRFIDS().subscribe(response =>{
      console.log(response);
      this.rfids = response;
    })
    this.registerForm = this.fb.group({
      number_RFID: ['', ],
    });  

/* aqui traigo los alumnos dentro del modal */
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

this.registerForm1 = this.fb.group({
  id_rfid:['',],
  id_alumno :  ['', ],
  last_name : ['', ],
  matricula: ['', ],
});  
    

this.mensajesSubscription = this.rfidService.getMessages().subscribe(response => {
 
  this.mensajes.push(response);
  var respuesta:any = response;
  if(respuesta.validacion == 2){
    this.renderer.addClass(this.modal5.nativeElement, "is-active");
  } 
    });
  }


  //servicio para obtnener el RFID

  getRFID(){
    this.rfidService.getRFIDS().subscribe(response =>{
      console.log(response);
      this.rfids = response;
      
      // this.rfidService.selectedRFID = response[0];//
      
    })
  }


  registrarRFID(){
    const params ={
      status:false,
      number_rfid:this.rfidService.selectedRFID.number_RFID
      
    }
    this.rfidService.agregarRFID(params).subscribe(response =>{
      console.log('RFID registrado',response);
      this.registerForm.reset();
      this.ngOnInit();
    })
  }

  enviarMsj(){
    this.renderer.addClass(this.modal5.nativeElement, "is-active");
  }

  cerrarModal(){
    this.renderer.removeClass(this.modal5.nativeElement, "is-active");
  }


  /* talo le movio los forms */
  asignar(alumno:any ) {
    console.log(this.rfidService.selectedRFID.number_RFID)
    this.registerForm1.controls["id_rfid"].setValue(this.rfidService.selectedRFID.number_RFID);
    this.registerForm1.controls["id_alumno"].setValue(alumno.id);
    this.registerForm1.controls["last_name"].setValue(alumno.last_name);
    this.registerForm1.controls["matricula"].setValue(alumno.matricula);
     console.log(this.registerForm1.value);
    /*this.rfidService.asignarRFIDAlumno(this.registerForm2.value, this.id_alumno).subscribe(response => {
      console.log('Asigando con exito',response)
    })

    this.rfidService.changeStatusRFID(this.registerForm.value, this.id_rfid).subscribe(response =>{
      console.log('Estatus rfid true',response)
    })  */

  }

}
