import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/models';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { doc, updateDoc} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class PacienteDataService {
  private paciente: Paciente | null = null;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  setPaciente(paciente: Paciente) {
    this.paciente = paciente;
  }

  getPaciente(): Paciente | null {
    return this.paciente;
  }
  actualizarPaciente(documentId: string, paciente: Paciente): Promise<void> {
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