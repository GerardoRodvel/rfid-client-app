import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild
} from "@angular/core";
import { RFIDService } from "./services/rfid.service";
import { Subscription } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("modal1", { static: true }) modal1: ElementRef;
  @ViewChild("modal2", { static: true }) modal2: ElementRef;
  @ViewChild("modal3", { static: true }) modal3: ElementRef;
  @ViewChild("modal4", { static: true }) modal4: ElementRef;
  @ViewChild("modal5", { static: true }) modal5: ElementRef;

  title = "RFID";
  alumnos: any[];
  id_rfid: number;
  num_RFID;
  registerForm2: FormGroup;
  registerForm1: FormGroup;
  listaAlumnos: any = [];

  constructor(
    private rfidService: RFIDService,
    private renderer: Renderer2,
    public fb: FormBuilder
  ) { }
  ngOnInit() {
    // this.rfidService.checkStatusSocket();

    this.rfidService.getMessages().subscribe(response => {
      console.log("Nuevo msj :", response);
      var respuesta: any = response;

      if (respuesta.validacion == 1) {
        this.rfidService.selectedRFID.number_RFID = respuesta.cuerpo;
        console.log(this.rfidService.selectedRFID);
        this.renderer.addClass(this.modal1.nativeElement, "is-active");
      } else if (respuesta.validacion == 2) {
        this.num_RFID = respuesta.cuerpo;
        this.getAlumnos();
        this.renderer.addClass(this.modal5.nativeElement, "is-active");
      } else if (respuesta.validacion == 3) {
        this.renderer.addClass(this.modal3.nativeElement, "is-active");
      } else if (respuesta.validacion == 4) {
        this.renderer.addClass(this.modal4.nativeElement, "is-active");
      }
    });

    this.registerForm1 = this.fb.group({
      id_rfid: [""],
      name: [""],
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

  cerrarModal() {
    this.renderer.removeClass(this.modal1.nativeElement, "is-active");
    this.renderer.removeClass(this.modal2.nativeElement, "is-active");
    this.renderer.removeClass(this.modal3.nativeElement, "is-active");
    this.renderer.removeClass(this.modal4.nativeElement, "is-active");
    this.renderer.removeClass(this.modal5.nativeElement, "is-active");
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

  guardarIdRfid(rfid: any, alumno: any) {
    this.id_rfid = rfid.id;
    this.registerForm1.controls["id_rfid"].setValue(this.id_rfid);
    this.registerForm1.controls["id_alumno"].setValue(alumno.id);
    this.registerForm1.controls["name"].setValue(alumno.name);
    this.registerForm1.controls["last_name"].setValue(alumno.last_name);
    this.registerForm1.controls["matricula"].setValue(alumno.matricula);


    console.log(this.registerForm1.value, this.registerForm2.value);

    this.rfidService
      .asignarRFIDAlumno(this.registerForm1.value, alumno.id)
      .subscribe(response => {
        console.log("Asigando con exito", response);

        // Una vez asignado el rfid, se cambia el estatus a true
        this.registerForm2.controls["id"].setValue(this.id_rfid);
        this.registerForm2.controls["number_rfid"].setValue(rfid.number_rfid);
        this.registerForm2.controls["status"].setValue(true);
        this.rfidService
          .changeStatusRFID(this.registerForm2.value, this.id_rfid)
          .subscribe(response => {
            console.log("Estatus rfid true", response);
          });
      });
    this.ngOnInit();
  }

  asignar(alumno: any) {
    this.rfidService.getRfidByNumber(this.num_RFID).subscribe(response => {
      this.guardarIdRfid(response, alumno);
      this.ngOnInit();
    });

    //servicio que Busca el rfid

    this.renderer.removeClass(this.modal5.nativeElement, "is-active");
  }
}
