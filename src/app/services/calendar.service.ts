import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from '../models/models';
import { doc, updateDoc} from '@angular/fire/firestore'
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Event } from '../models/models';
import {map} from 'rxjs'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private eventsCollection: AngularFirestoreCollection<Event>;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.eventsCollection = this.firestore.collection('events');
  }

  addEvent(event: Event): Promise<any> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        event.userId = user.uid; // Asignar el UID del usuario al evento
        const eventDocRef = this.firestore.collection('events').doc(event.id);
        return eventDocRef.set(event);
      } else {
        return Promise.reject('Usuario no autenticado');
      }
    });
  }
  getEvents(): Promise<Event[]> {
    return this.afAuth.currentUser
      .then((user) => {
        if (user) {
          const userId = user.uid;
          return this.firestore
            .collection<Event>('events', (ref) => ref.where('userId', '==', userId))
            .get()
            .toPromise()
            .then((snapshot) => {
              const events: Event[] = [];
              if (!snapshot?.empty) {
                snapshot?.forEach((doc) => {
                  const event = doc.data();
                  events.push(event);
                });
              }
              console.log('Eventos Encontrados');
              return events;
              
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
  
  deleteEvent(eventId: string): Promise<void> {
    return this.eventsCollection.doc(eventId).delete();
  }

  removeEvent(eventId: string): Promise<void> {
    const eventDocRef = this.firestore.collection('events').doc(eventId);
    return eventDocRef.delete();
  }

}