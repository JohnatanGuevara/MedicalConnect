import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Paciente } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  constructor(private firestore: AngularFirestore) {}

  guardarConsulta(paciente: Paciente): Promise<DocumentReference<unknown>> {
    return this.firestore.collection('consultas').add(paciente)
      .then(docRef => {
        console.log('Consulta guardada exitosamente en Firestore');
        return docRef;
      })
      .catch(error => {
        console.error('Error al guardar la consulta:', error);
        throw error;
      });
  }

  obtenerConsultas(): Promise<Paciente[]> {
    return this.firestore.collection<Paciente>('consultas')
      .get()
      .toPromise()
      .then((snapshot?) => {
        const consultas: Paciente[] = [];
        snapshot?.forEach((doc) => {
          const consulta = doc.data();
          consultas.push(consulta);
        });
        return consultas;
      })
      .catch(error => {
        console.error('Error al obtener las consultas:', error);
        throw error;
      });
  }

  vaciarConsultas(): Promise<void> {
    return this.firestore.collection('consultas')
      .get()
      .toPromise()
      .then((snapshot) => {
        const batch = this.firestore.firestore.batch();
        snapshot?.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
      .then(() => {
        console.log('Consultas vaciadas exitosamente');
      })
      .catch(error => {
        console.error('Error al vaciar las consultas:', error);
        throw error;
      });
  }
}