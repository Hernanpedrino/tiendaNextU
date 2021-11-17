import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
firebase.initializeApp(environment.firebase);


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor() { }
  
  loginUser(email: string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  logOut(){
    localStorage.clear();
    return firebase.auth().signOut();
  }

}

