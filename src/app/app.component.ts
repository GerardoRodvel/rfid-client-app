import { Component, OnInit, ElementRef, Renderer2, ViewChild, } from '@angular/core';
import { RFIDService } from './services/rfid.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild("modal1", { static: true }) modal1: ElementRef;
  @ViewChild("modal2", { static: true }) modal2: ElementRef;
  @ViewChild("modal3", { static: true }) modal3: ElementRef;
  @ViewChild("modal4", { static: true }) modal4: ElementRef;

  title = 'RFID';

  mensajesSubscription: Subscription;
  mensajes: any[] = [];

  constructor(
    private rfidService: RFIDService,
    private renderer: Renderer2

  ) {

  }
  ngOnInit() {
    // this.rfidService.checkStatusSocket();

    this.mensajesSubscription = this.rfidService.getMessages().subscribe(response => {
      console.log('mensaje desde el Servidor:',response);
      this.mensajes.push(response);
      var respuesta:any = response;
      
      if(respuesta.validacion == 1){
        this.rfidService.selectedRFID.number_RFID = respuesta.cuerpo;
        console.log(this.rfidService.selectedRFID);
        this.renderer.addClass(this.modal1.nativeElement, "is-active");
      }else if(respuesta.validacion == 2){
        this.renderer.addClass(this.modal2.nativeElement, "is-active");
      }else if(respuesta.validacion == 3){
        this.renderer.addClass(this.modal3.nativeElement, "is-active");
      }else{
        this.renderer.addClass(this.modal4.nativeElement, "is-active");
      }    
    });
  }

  enviarMsj1(){
    let msj = 'hola desde angular';
    this.rfidService.enviarMSJ(msj,'mensaje')
  }
  enviarMsj2(){
    let msj = 'hola desde angular opcion 2';
    this.rfidService.enviarMSJ(msj,'mensaje2')

  }
  enviarMsj3(){
    let msj = 'hola desde angular';
    this.rfidService.enviarMSJ(msj,'mensaje3')

  }

  enviarMsj4(){
    let msj = 'hola desde angular';
    this.rfidService.enviarMSJ(msj,'mensaje4')
  }

  cerrarModal(){
    this.renderer.removeClass(this.modal1.nativeElement, "is-active");
    this.renderer.removeClass(this.modal2.nativeElement, "is-active");
    this.renderer.removeClass(this.modal3.nativeElement, "is-active");
    this.renderer.removeClass(this.modal4.nativeElement, "is-active");
    
  }
}
