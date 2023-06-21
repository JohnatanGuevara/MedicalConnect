import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User, UserLogin } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  saveUsuario(usuario: User): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
      .then((result) => {
        const uid = result.user?.uid ?? '';
        usuario.uid = uid;
  
        return this.firestore.collection('usuarios').doc(uid).set(usuario)
          .then(() => {
            console.log('Usuario registrado exitosamente en Firestore');
          });
      });
  }

  iniciarSesion(usuarioLogin: UserLogin): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(usuarioLogin.correo, usuarioLogin.password);
  }
  


  logout() {
    return this.afAuth.signOut().then(() => {
      console.log('Logout Correcto');

    });
  }

  stateUser(){
    return this.afAuth.authState
  }

  actualizarUsuario(uid: string, usuario: User): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).set(usuario, { merge: true });
  }
  obtenerUsuarioActual(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.firestore.collection('usuarios').doc(user.uid).get()
            .subscribe((doc) => {
              if (doc.exists) {
                const usuario = doc.data() as User;
                resolve(usuario);
              } else {
                resolve(null);
              }
            });
        } else {
          resolve(null);
        }
      });
    });
  }
}
