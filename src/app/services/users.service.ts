import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
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
    return firebase.auth().signOut();
  }
  activeUser():boolean{
    const user = firebase.auth().currentUser;
    if (user) {
      return true
    } else {
      return false
    }
    
  }
}

