import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm: any;
  usuario: User = {
    nombres: '',
    apellidos: '',
    correo: '',
    cedula: '' ,
    password: '',
    perfil: 'Usuario' ,
    uid: '',
    CM: '',
    telefono: '',
    MPPS:'',
    RIF: '',
    Univ: '',
    Merito:'',
}

isLoading: boolean = false;

  constructor ( private pf:FormBuilder, private _AuthService: AuthService, private router:Router){

    this.registroForm = this.pf.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cedula: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      perfil: ['Usuario', Validators.required]
    });


  }

  saveUsuario(){
    if (this.registroForm.valid) {
      const usuario: User = {
        nombres: this.registroForm.value.nombres,
        apellidos: this.registroForm.value.apellidos,
        correo: this.registroForm.value.correo,
        cedula: this.registroForm.value.cedula,
        password: this.registroForm.value.password,
        perfil: this.registroForm.value.perfil,
        uid: '',
        CM: '',
    telefono: '',
    MPPS:'',
    RIF: '',
    Univ:'',
    Merito:'',
      };

      this.isLoading = true;

      this._AuthService.saveUsuario(usuario)
        .then(() => {
          console.log('Paciente Registrado');
          this.isLoading = false;
          this.router.navigateByUrl('/homePage')
          
        })
        .catch(error => {
          console.error('Error al registrar paciente:', error);
          this.isLoading = false;
        })
        .finally(() => {
          this.isLoading = false;
         
          this.registroForm.reset();
        });
    } else {
      this.isLoading = false;
      
    }

    
   
  }
}