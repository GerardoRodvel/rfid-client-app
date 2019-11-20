import { Injectable } from '@angular/core';//injectar algo que quiero al inicializar el proyecto
import { Socket } from 'ngx-socket-io';
// import { emit } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socketStatus = false;//para verificiar el servicio este conectado cliente al servidor
  // msj = this.socket.fromEvent<String>('msj');

  constructor(private socket: Socket) {
    // this.checkStatus();
  }

  // checkStatus() {//metodo para verificar 
  //   this.socket.on('connect', () => {//socket contiene todos los recursos de Socket, metodo on
  //     console.log('Conectado al servidor');
  //     this.socketStatus = true;
  //   });
    

  //   this.socket.on('disconnect', () => {//contiene todos los recursos de socket
  //     console.log('Desconectado del servidor');
  //     this.socketStatus = false;
  //   });
  // }
  
  emit(evento: string, payload?: any, callback?: Function) {//encarga enviar todos los metodos al servidor
    console.log('Emitiendo: ' + evento)
    // emit('EVENTO', payload, callback?)
    this.socket.emit(evento, payload, callback)//payload toda la informacion que se va a enviar del cliente, callback va los datos del cliente
  }


  listen(evento: string) {//para poder emitir o levantar el servicio
    return this.socket.fromEvent(evento)
  }

}

