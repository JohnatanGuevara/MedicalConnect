import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Router } from '@angular/router';
import { PacienteDataService } from 'src/app/paciente-data.service';
import { DomSanitizer } from '@angular/platform-browser';
 


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./DatosFiliatorios.css']
})
export class DetallesComponent { cssUrl!: string;

  title='dinamic-styles';
  @Input() paciente: any;
  @Output() cerrar: EventEmitter<void> = new EventEmitter<void>();

  constructor(public sanitizer: DomSanitizer, private pacienteService: PacientesService, private firestore: AngularFirestore, private router: Router, private pacienteDataService: PacienteDataService) {
this.cssUrl = '/assets/nicepage.css' }

  actualizarPaciente() {
    if (this.paciente && this.paciente.id) {
      this.pacienteDataService.actualizarPaciente(this.paciente.id, this.paciente)
        .then(() => {
          console.log('Paciente actualizado correctamente');
          this.cerrarDetalles();
          window.alert('Paciente Actualizado')
        })
        .catch((error) => {
          console.error('Error al actualizar el paciente:', error);
        });
    } else {
      console.error('No se puede actualizar el paciente: ID no válido');
    }
  }

  cerrarDetalles() {
    this.cerrar.emit();
  }

  irAConsulta() {
    this.pacienteDataService.setPaciente(this.paciente);
      this.router.navigateByUrl('/datosfiliatorios');
    }
    // Aquí puedes redirigir al componente "DatosFiliatoriosComponent"
  }
  
