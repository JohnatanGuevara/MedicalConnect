import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-infoy-ant',
  templateUrl: './infoy-ant.component.html',
  styleUrls: ['./infoy-ant.component.css']
})
export class InfoyAntComponent implements OnInit {

  cssUrl!: string;

  title='dinamic-styles'
  paciente: Paciente | null = null;

  constructor(private pacienteDataService: PacienteDataService, private pacientesService: PacientesService, public sanitizer: DomSanitizer) {
    this.cssUrl = '/assets/nicepage.css';
  }

  ngOnInit() {
    this.paciente = this.pacienteDataService.getPaciente();
    console.log(this.paciente);
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
  isTrue(value: boolean): boolean {
    return value === true;
  }

  

}
