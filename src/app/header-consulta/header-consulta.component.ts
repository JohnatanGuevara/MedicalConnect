import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Paciente } from '../models/models';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { PacientesService } from 'src/app/services/pacientes.service';

@Component({
  selector: 'app-header-consulta',
  templateUrl: './header-consulta.component.html',
  styleUrls: ['./header-consulta.component.css']
})
export class HeaderConsultaComponent {

  paciente: Paciente | null = null;
  cssUrl!: string;

  title='dinamic-styles';

  constructor(public sanitizer: DomSanitizer, private pacienteDataService: PacienteDataService, private pacientesService: PacientesService){

    this.cssUrl = '/assets/nicepage.css'
  }

  ngOnInit(){
    this.paciente = this.pacienteDataService.getPaciente();
  }

}
