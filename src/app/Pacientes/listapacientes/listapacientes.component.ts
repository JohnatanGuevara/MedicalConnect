import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Paciente } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapacientes',
  templateUrl: './listapacientes.component.html',
  styleUrls: ['./listapacientes.component.css', './nicepage.css']
})
export class ListapacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  pacienteSeleccionado: any;
  isLoading = false;
  paciente: Paciente | null = null;
 


  constructor(private pacientesService: PacientesService, private pacienteDataServices: PacienteDataService, private router: Router) {}

  ngOnInit() {
    this.getPacientes();
  }

  getPacientes() {
    this.pacientesService.getPacientes()
      .then((pacientes) => {
        this.pacientes = pacientes;
        console.log('Pacientes Obtenidos')
      })
      .catch((error) => {
        console.error('Error al obtener los pacientes:', error);
      });
  }
  mostrarDetalles: boolean = false;
  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.mostrarDetalles = true;
  }

  cerrarDetalles() {
    this.mostrarDetalles = false;
  }
  buscarPacientePorCedula(cedula: string) {
    this.isLoading = true;
    this.pacientesService
      .buscarPacientePorCedula(cedula)
      .then((paciente) => {
        if (paciente) {
          this.paciente = paciente;
          this.pacienteDataServices.setPaciente(paciente);
          this.router.navigateByUrl('/datosfiliatorios')
          

          
      

          this.isLoading = false;
      
        } else {
          this.paciente = null;
          this.isLoading = false;
          window.alert('No se consigue un Paciente con el ID ingresado')
          // Realizar alguna acción cuando no se encuentre el paciente
        }
      })
      .catch((error) => {
        console.error('Error al buscar paciente:', error);
        this.isLoading = false;
        // Manejar el error de acuerdo a tus necesidades
      });
  }

 
}