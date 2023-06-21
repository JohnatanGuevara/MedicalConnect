import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from '../models/models';
import { doc, updateDoc} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  guardarPaciente(paciente: Paciente): Promise<DocumentReference<unknown>> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const userId = user.uid;
        paciente.userId = userId; // Agregar el ID del usuario al paciente
  
        return this.firestore.collection('pacientes').add(paciente)
        .then(docRef => {
          console.log('Paciente guardado exitosamente en Firestore');
          return docRef; // Devolver el docRef
        });
    } 
      else {
        return Promise.reject('Usuario no autenticado');
      }
    });
  }
  getPacientes(): Promise<Paciente[]> {
    return this.afAuth.currentUser
      .then((user) => {
        if (user) {
          const userId = user.uid;
          return this.firestore
            .collection<Paciente>('pacientes', (ref) => ref.where('userId', '==', userId))
            .get()
            .toPromise()
            .then((snapshot) => {
              const pacientes: Paciente[] = [];
              if (!snapshot?.empty) { // Verificar si el snapshot no está vacío
                snapshot?.forEach((doc) => {
                  const paciente = doc.data();
                  pacientes.push(paciente);
                });
              }
              return pacientes;
            });
        } else {
          return Promise.reject('Usuario no autenticado');
        }
      })
      .catch((error) => {
        console.error('Error al obtener el usuario actual:', error);
        return Promise.reject('Error al obtener el usuario actual');
      });
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
  buscarPacientePorCedula(cedula: string): Promise<Paciente | null> {
    return this.afAuth.currentUser
      .then((user) => {
        if (user) {
          const userId = user.uid;
          if (cedula) { // Verificar si la cedula está definida y no es undefined
            return this.firestore
              .collection<Paciente>('pacientes', (ref) => ref.where('userId', '==', userId).where('cedula', '==', cedula))
              .get()
              .toPromise()
              .then((snapshot?) => {
                if (!snapshot?.empty) {
                  const paciente = snapshot?.docs[0].data();
                  console.log('pacienteconseguido', paciente);
                  return paciente as Paciente;
                
                } else {
                  console.log('No se encontró ningún paciente');
                  return null;
                }
              });
          } else {
            console.log('Cédula no definida');
            return null; // Retornar null si la cedula no está definida
          }
        } else {
          console.log('no hay paciente');
          return Promise.reject('Usuario no autenticado');
         
        }
        
      })
      .catch((error) => {
        console.error('Error al obtener el usuario actual:', error);
        return Promise.reject('Error al obtener el usuario actual');
      });
  }
}

