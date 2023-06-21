import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Paciente, User } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', './nicepage.css']
})
export class HomepageComponent implements OnInit {
  @ViewChild('recipeTextarea') recipeTextarea!: ElementRef;
  @ViewChild('indicacionesTextarea') indicacionesTextarea!: ElementRef;
  
  paciente: Paciente | null = null;
  usuario: User | null = null;

  constructor(private pacienteDataService: PacienteDataService, private pacientesService: PacientesService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.paciente = this.pacienteDataService.getPaciente();
    this.authService.obtenerUsuarioActual().then((user) => {
      if (user) {
        this.usuario = {
          nombres: user.nombres ?? '',
          apellidos: user.apellidos ?? '',
          correo: user.correo ?? '',
          cedula: user.cedula ?? '',
          password:user.nombres ?? '', 
          perfil:user.nombres ?? '', 
          uid: '',
          CM:user.CM ?? '', 
          telefono: user.nombres ?? '',
          MPPS: user.MPPS ?? '',
          RIF: user.RIF ?? '',
          Univ:user.Univ ?? '',
          Merito:user.Merito ?? '',
        };
      }
    });
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/index'])
  }

}


