import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/models';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ActivatedRoute } from '@angular/router';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-datos-filiatorios',
  templateUrl: './datos-filiatorios.component.html',
  styleUrls: ['./DatosFiliatorios.css']
})
export class DatosFiliatoriosComponent implements OnInit {
  paciente: Paciente | null = null;

  cssUrl!: string;

  title='dinamic-styles'

  constructor(private pacienteDataService: PacienteDataService, private pacientesService: PacientesService, public sanitizer: DomSanitizer) {

    this.cssUrl = '/assets/nicepage.css'
  }

  ngOnInit() {
    this.paciente = this.pacienteDataService.getPaciente();
  }

  actualizarPaciente() {
    if (this.paciente && this.paciente.id) {
      this.pacientesService.actualizarPaciente(this.paciente.id, this.paciente)
        .then(() => {
          console.log('Paciente actualizado correctamente');
          window.alert('Paciente Actualizado')
        })
        .catch((error) => {
          console.error('Error al actualizar el paciente:', error);
        });
    } else {
      console.error('No se puede actualizar el paciente: ID no válido');
    }
  }

}
