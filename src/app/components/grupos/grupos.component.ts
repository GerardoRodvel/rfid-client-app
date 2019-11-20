import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  grupos;
  selectGroup;

  
  constructor() { }

  ngOnInit() {

    this.grupos = ["Grupo 1","Grupo 2", "Grupo 3", "Grupo 4"]
    
  }

  //SERVICIO PARA OBTENER TODOS LOS GRUPOS

  //SERVICIO PARA OBTENER TODOS LOS ALUMNOS

  editarAlumno(){

  }
  eliminarAlumno(){
    
  }

  getGrupo(){
    console.log(this.selectGroup)
  }

}
