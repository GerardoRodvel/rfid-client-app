import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { HomeComponent } from './components/home/home.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RfidComponent } from './components/rfid/rfid.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { MenuComponent } from './components/menu/menu.component';
import { BarraComponent } from './components/barra/barra.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';



@NgModule({
  declarations: [
    AppComponent,
    AsistenciaComponent,
    HomeComponent,
    AlumnosComponent,
    RfidComponent,
    GruposComponent,
    MenuComponent,
    BarraComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NgbModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
