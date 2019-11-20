import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { RfidComponent } from './components/rfid/rfid.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { GruposComponent } from './components/grupos/grupos.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },{
    path:'home',
    component:HomeComponent
  },{
    path:'alumnos',
    component:AlumnosComponent
  },{
    path:'rfid',
    component:RfidComponent
  },{
    path:'asistencia',
    component:AsistenciaComponent
  },{
    path:'grupos',
    component:GruposComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
