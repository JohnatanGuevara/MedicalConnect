import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Paciente } from 'src/app/models/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nicepage.css', 'NuevoPaciente.css']
})
export class NuevoPacienteComponent {

  isFormValid  = false;

  pacientesForm!: FormGroup;
  paciente: Paciente = {
    nombres: '',
    apellidos: '',
    cedula: '',
    motivo: '',
    seguro: '',
    sexo: '',
    fecha: new Date(),
    userId: '',
    id: '',
    antecedenteM: '',
    antecedenteQ: '',
    antecedentesF: '',
    habitosP: '',
    medicamentos: '',
    edad: '',
    domicilio: '',
    nombreseguro: '',
    telefonoP: '',
    telefonoO: '',
    antecedentesPadre: '',
    antecedentesMadre: '',
    antecedentesAbuelo: '',
    antecedentesHermana: '',
    antecedentesHijo: '',
    peso: '',
    talla: '',
    mmHg: '',
    AA: false,
    evaluacion: '',
    HTA: false,
    DM: false,
    ASMA: false,
    COVID: false,
    ONCOLOGICO: false,
    NIEGAAM: false,
    TABACO: false,
    OH: false,
    ILICITAS: false,
    MEDICAMENTOS: false,
    MADRE: '',
    PADRE: '',
    ABUELOS: '',
    HERMANOS: '',
    ENFERMEDADACT: '',
    TA: '',
    FC: '',
    FR: '',
    SATO2: '',
    ON: false,
    MS: false,
    IMC: '',
    EXAMENF: '',
    IMPRESIONDIAG: '',
    DESCRIPCIONAM: '',
    PLAN:'',
    DESCRIPCION:'',
    RECIPE: '',
    INDICACIONES: '',
    PARACLINICOS:'',
    RECIPENEW:'',
    INDICACIONESNEW: '',
  };
  isLoading: boolean = false;
  userId: string = '';
  savePaciente!: NuevoPacienteComponent;
  pacienteId!: '';

  constructor(private pf: FormBuilder, private _PacientesService: PacientesService, private afAuth: AngularFireAuth, private router:Router, private firestore:AngularFirestore) {

    
  }

  ngOnInit() {
    this.pacientesForm = this.pf.group ({
      nombres: '',
      apellidos: '',
      ci: '',
      motivo: '',
      seguro: '',
      fecha: '',
      sexo: '',
      userId: '',
      id: '',
      antecedenteM: '',
    antecedenteQ: '',
    antecedentesF: '',
    habitosP: '',
    medicamentos: '',
    edad: '',
    domicilio: '',
    nombreseguro: '',
    telefonoP: '',
    telefonoO: '',
    antecedentesPadre: '',
    antecedentesMadre: '',
    antecedentesAbuelo: '',
    antecedentesHermana: '',
    antecedentesHijo: '',
    peso: '',
    talla: '',
    mmHg: '',
    AA: false,
    evaluacion: '',
    HTA: false,
    DM: false,
    ASMA: false,
    COVID: false,
    ONCOLOGICO: false,
    NIEGAAM: false,
    TABACO: false,
    OH: false,
    ILICITAS: false,
    MEDICAMENTOS: false,
    MADRE: '',
    PADRE: '',
    ABUELOS: '',
    HERMANOS: '',
    ENFERMEDADACT: '',
    TA: '',
    FC: '',
    FR: '',
    SATO2: '',
    ON: false,
    MS: false,
    IMC: '',
    EXAMENF: '',
    IMPRESIONDIAG: '',
    DESCRIPCIONAM:'',
    PLAN:'',
    DESCRIPCION:'',
    RECIPE: '',
    INDICACIONES: '',
    PARACLINICOS: '',
    RECIPENEW:'',
    INDICACIONESNEW:'',
    });
    this.getCurrentUser();
    this.pacientesForm.valueChanges.subscribe(() => {
      this.isFormValid = this.pacientesForm.valid;
    });
  }
  

  async getCurrentUser() {
    const user = await this.afAuth.currentUser;
    if (user) {
      this.userId = user.uid;
    }
  }

  savePacientes() { if (this.pacientesForm.invalid) {
    this.isFormValid = false;
    this.isLoading = false;
    return;
  }
    const savePaciente: Paciente = {
      nombres: this.pacientesForm.get('nombres')?.value,
      apellidos: this.pacientesForm.get('apellidos')?.value,
      cedula: this.pacientesForm.get('ci')?.value,
      motivo: this.pacientesForm.get('motivo')?.value,
      seguro: this.pacientesForm.get('seguro')?.value,
      sexo: this.pacientesForm.get('sexo')?.value,
      fecha: this.pacientesForm.get('fecha')?.value,
      userId: this.userId,
      antecedenteM: this.pacientesForm.get('antecedenteM')?.value,
      antecedenteQ: this.pacientesForm.get('antecedenteQ')?.value,
      antecedentesF: this.pacientesForm.get('antecedentesF')?.value,
      habitosP:this.pacientesForm.get('habitosP')?.value,
      medicamentos: this.pacientesForm.get('medicamentos')?.value,
      edad: this.pacientesForm.get('edad')?.value,
      domicilio: this.pacientesForm.get('domicilio')?.value,
      nombreseguro: this.pacientesForm.get('nombreseguro')?.value,
      telefonoP: this.pacientesForm.get('telefonoP')?.value,
      telefonoO: this.pacientesForm.get('telefonoO')?.value,
      antecedentesPadre: this.pacientesForm.get('antecedentesPadre')?.value,
      antecedentesMadre: this.pacientesForm.get('antecedentesMadre')?.value,
      antecedentesAbuelo: this.pacientesForm.get('antecedentesAbuelo')?.value,
      antecedentesHermana: this.pacientesForm.get('antecedentesHermana')?.value,
      antecedentesHijo: this.pacientesForm.get('antecedentesHijo')?.value,
      peso: this.pacientesForm.get('peso')?.value,
      talla: this.pacientesForm.get('talla')?.value,
      mmHg: this.pacientesForm.get('mmHg')?.value,
      AA: this.pacientesForm.get('AA')?.value,
      evaluacion: this.pacientesForm.get('evaluacion')?.value,
      HTA: this.pacientesForm.get('HTA')?.value,
      DM: this.pacientesForm.get('DM')?.value,
      ASMA: this.pacientesForm.get('ASMA')?.value,
      COVID: this.pacientesForm.get('COVID')?.value,
      ONCOLOGICO: this.pacientesForm.get('ONCOLOGICO')?.value,
      NIEGAAM: this.pacientesForm.get('NIEGAAM')?.value,
      DESCRIPCIONAM:this.pacientesForm.get('DESCRIPCIONAM')?.value,
      TABACO: this.pacientesForm.get('TABACO')?.value,
      OH: this.pacientesForm.get('OH')?.value,
      ILICITAS: this.pacientesForm.get('ILICITAS')?.value,
      MEDICAMENTOS: this.pacientesForm.get('MEDICAMENTOS')?.value,
      MADRE: this.pacientesForm.get('MADRE')?.value,
      PADRE: this.pacientesForm.get('PADRE')?.value,
      ABUELOS: this.pacientesForm.get('ABUELOS')?.value,
      HERMANOS: this.pacientesForm.get('HERMANOS')?.value,
      ENFERMEDADACT: this.pacientesForm.get('ENFERMEDADACT')?.value,
      TA: this.pacientesForm.get('TA')?.value,
      FC: this.pacientesForm.get('FC')?.value,
      FR: this.pacientesForm.get('FR')?.value,
      SATO2: this.pacientesForm.get('SATO2')?.value,
      ON: this.pacientesForm.get('ON')?.value,
      MS: this.pacientesForm.get('MS')?.value,
      IMC: this.pacientesForm.get('IMC')?.value,
      EXAMENF: this.pacientesForm.get('EXAMENF')?.value,
      IMPRESIONDIAG: this.pacientesForm.get('IMPRESIONDIAG')?.value,
      PLAN: this.pacientesForm.get('PLAN')?.value,
      DESCRIPCION: this.pacientesForm.get('DESCRIPCION')?.value,
      RECIPE: this.pacientesForm.get('RECIPE')?.value,
      INDICACIONES: this.pacientesForm.get('INDICACIONES')?.value,
      PARACLINICOS: this.pacientesForm.get('PARACLINICOS')?.value,
      RECIPENEW: this.pacientesForm.get('RECIPENEW')?.value,
      INDICACIONESNEW: this.pacientesForm.get('INDICACIONESNEW')?.value,

      id: '', // Dejarlo vacío por ahora
    };
  
    this.isLoading = true;
  
    this._PacientesService.guardarPaciente(savePaciente)
      .then(docRef => {
        console.log('Paciente Registrado con ID:', docRef.id);
        savePaciente.id = docRef.id; // Asignar el ID del documento al paciente
        const pacienteId = docRef.id;

  
        return this.actualizarPacienteId(savePaciente.id, savePaciente);
      })
      .then(() => {
        this.pacientesForm.reset();
        this.isLoading = false;
        this.router.navigateByUrl('/listapacientes');
       
      })
      .catch(error => {
        console.error('Error al registrar y actualizar paciente:', error);
        this.isLoading = false;
      });
  }
  
  async actualizarPacienteId(documentId: string, paciente: Paciente) {
    const pacienteRef = this.firestore.collection('pacientes').doc(documentId).ref;
  
    return pacienteRef.update(paciente)
      .then(() => {
        console.log('Paciente actualizado exitosamente en Firestore');
      })
      .catch((error) => {
        console.error('Error al actualizar el paciente:', error);
        throw error;
      });
  }
}