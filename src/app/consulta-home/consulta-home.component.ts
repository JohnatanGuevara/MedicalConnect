import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PacientesService } from 'src/app/services/pacientes.service';
import { HistPaciente } from 'src/app/models/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/models/models';
import { Router } from '@angular/router';
import { PacienteDataService } from '../paciente-data.service';
import { ConsultasService } from '../services/consultas.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-consulta-home',
  templateUrl: './consulta-home.component.html',
  styleUrls: ['./consulta-home.component.css']
})
export class ConsultaHOMEComponent {
  cssUrl!: string;

  title='dinamic-styles';
  historyForm!: FormGroup;
  userId: string = '';
  pacienteId: string = '';
  paciente: Paciente | null = null;
  mostrarHistoriaMedica: boolean = false;
  isLoading: boolean = false;
  consultasDia: Paciente[] = [];
  consultas: Paciente[] = [];

  cedula: string = '';
  consultaSeleccionada: Paciente | null = null;

  constructor(
    private fb: FormBuilder,
    private pacientesService: PacientesService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private pacienteDataService: PacienteDataService,
    private consultasService: ConsultasService,
    private router: Router,public sanitizer: DomSanitizer
  ) {

    this.cssUrl = '/assets/nicepage.css'
  }

  ngOnInit() {
    
    this.historyForm = this.fb.group({
      motivo: '',
      antecedenteM: '',
      antecedenteQ: '',
      antecedentesF: '',
      habitosP: '',
      medicamentos: '',
      userId: ''
    });

    this.afAuth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });

    this.route.params.subscribe((params) => {
      this.pacienteId = params['id']; // Obtener el pacienteId de los parámetros de la URL
    });
  }

  

  buscarPacientePorCedula(cedula: string) {
    this.isLoading = true;
    this.pacientesService
      .buscarPacientePorCedula(cedula)
      .then((paciente) => {
        if (paciente) {
          this.paciente = paciente;
          this.pacienteDataService.setPaciente(paciente);
          this.cargarDatosPacienteEnFormulario();
          

          
      

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

  cargarDatosPacienteEnFormulario() {
    if (this.paciente) {
      this.historyForm.patchValue({
        motivo: this.paciente.motivo,
        antecedenteM: this.paciente.antecedenteM,
        antecedenteQ: this.paciente.antecedenteQ,
        antecedentesF: this.paciente.antecedentesF,
        habitosP: this.paciente.habitosP,
        medicamentos: this.paciente.medicamentos,
        userId: this.userId
      });
    }
  }

  
}

