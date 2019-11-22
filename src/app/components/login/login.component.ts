import { Component, OnInit } from '@angular/core';
import { LoginService} from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginForm: FormGroup;
 constructor(public loginService: LoginService,public fb: FormBuilder, private router:Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username:'',
      password:'',
    });

  }

  login(){
    this.loginService.login(this.loginForm.value).subscribe(response =>{
      localStorage.setItem('token',response.token);
       this.router.navigate(['/home']);
      console.log('Guardado con exito: ',response.token);
      console.log(response);
      //this.loginForm.reset();
      },error =>{
      console.log(error);
    });
    
  }

}
