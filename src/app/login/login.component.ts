import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User, UserLogin } from 'src/app/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./nicepage.css', 'Login-Template-2.css']
})
export class LoginComponent {

  loginForm: any;
  usuarioLogin: UserLogin = {
    
    correo: '',
    
    password: '',
   
}

isLoading: boolean = false;

  constructor ( private pf:FormBuilder, private _AuthService: AuthService, private router:Router){

    this.loginForm = this.pf.group({
     
      correo: ['', [Validators.required, Validators.email]],
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });


  }

  iniciarSesion(){
    if (this.loginForm.valid) {
      const usuarioLogin: UserLogin = {
        
        correo: this.loginForm.value.correo,
        
        password: this.loginForm.value.password,
       
      };

      this.isLoading = true;

      this._AuthService.iniciarSesion(usuarioLogin)
        .then(() => {
          console.log('Inicio de Sesión Exitoso');
          this.isLoading = false;
          this.router.navigateByUrl('/homePage')
          
        })
        .catch(error => {
          console.error('Error al registrar paciente:', error);
          this.isLoading = false;
          window.alert('Datos incorrectos')
        })
        .finally(() => {
          this.isLoading = false;
         
          this.loginForm.reset();
        });
    } else {
      this.isLoading = false;
      
    }

    
   
  }
}
