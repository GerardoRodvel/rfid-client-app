import { Component, OnInit } from "@angular/core";
import { RFIDService } from "src/app/services/rfid.service";
import { RFID } from "src/app/models/rfid/rfid";
import { Alumno } from "src/app/models/alumnos/alumno";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  rfids: RFID[];
  alumnos: Alumno[];
  rfid;
  selectedRFID: RFID;
  selectedStudent: Alumno;
  id_alumno;
  id_rfid;

  listaRFID: any = [];
  listaAlumnos: any = [];
  registerForm: FormGroup;
  registerForm2: FormGroup;
  constructor(private rfidService: RFIDService, public fb: FormBuilder) { }

  ngOnInit() {
    var j = 0;


    this.rfidService.change.subscribe(response => {
      this.getAlumnos();
    });

    this.getAlumnos();



    this.registerForm = this.fb.group({
      number_RFID: [""]
    });

    this.registerForm = this.fb.group({
      id_rfid: [""],
      id_alumno: [""],
      last_name: [""],
      matricula: [""]
    });

    this.registerForm2 = this.fb.group({
      id: [""],
      number_rfid: [""],
      status: [""]
    });
  }



  getAlumnos() {
    var z = 0;
    this.rfidService.getAlumnos().subscribe(response => {
      this.alumnos = response;
      for (let i = 0; i < response.length; i++) {
        const element = response[i];
        if (
          element.id_rfid == null ||
          element.id_rfid == undefined ||
          element.id_rfid == ""
        ) {
          this.listaAlumnos[z] = element;
          z++;
        }
      }
    });
  }
}
