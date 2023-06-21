import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css', './nicepage.css']
})
export class PerfilComponent implements OnInit {
  usuario: User = {
    nombres: '',
    apellidos: '',
    correo: '',
    cedula: '',
    password: '',
    perfil: '',
    uid: '',
    CM: '',
    telefono: '',
    MPPS: '',
    RIF: '',
    Univ: '',
    Merito: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Obtener los datos del usuario actual y asignarlos al objeto usuario
    this.authService.obtenerUsuarioActual().then((user) => {
      if (user) {
        this.usuario.nombres = user.nombres ?? '';
        this.usuario.apellidos = user.apellidos ?? '';
        this.usuario.correo = user.correo ?? '';
        this.usuario.uid = user.uid;
        this.usuario.CM = user.CM ?? '';
        this.usuario.MPPS = user.MPPS ?? '';
        this.usuario.RIF = user.RIF ?? '';
        this.usuario.Univ = user.Univ ?? '';
        this.usuario.Merito = user.Merito ?? '';
        this.usuario.cedula = user.cedula ?? '';
      }
    });
  }

  actualizarUsuario() {
    if (this.usuario.uid) {
      this.authService.actualizarUsuario(this.usuario.uid, this.usuario)
        .then(() => {
          console.log('Usuario actualizado correctamente');
          // Realizar las acciones necesarias después de actualizar el usuario
        })
        .catch((error) => {
          console.error('Error al actualizar el usuario:', error);
        });
    } else {
      console.error('No se puede actualizar el usuario: UID no válido');
    }
  }
}