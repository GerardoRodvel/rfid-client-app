import { Component, OnInit } from '@angular/core';
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
  rfids:RFID []


  rfid;

  mensajesSubscription: Subscription
  mensajes: any[] = [];

  constructor(private rfidService: RFIDService,
    public fb: FormBuilder,
    private socektService: SocketService) {

      
   }

  ngOnInit() {
    this.rfidService.getRFIDS().subscribe(response =>{
      console.log(response);
      this.rfids = response;
    })
    this.registerForm = this.fb.group({
      number_RFID: ['', ],
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
  
  editarRFID(){

  }
  eliminarRFID(){
    
  }

  registrarRFID(){
    const params ={
      status:false,
      number_rfid:this.rfidService.selectedRFID.number_RFID
      
    }
    this.rfidService.agregarRFID(params).subscribe(response =>{
      console.log('RFID registrado',response);
    })
  }

  enviarMsj(){
    let msj = 'hola desde angular';
    this.rfidService.enviarMSJ(msj,'')
  }

}
