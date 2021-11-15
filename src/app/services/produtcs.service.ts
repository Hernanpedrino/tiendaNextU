import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../pages/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutcsService {


  constructor(private firestore: AngularFirestore) { }

  getProducts(){
    return this.firestore.collection<Product>('productos').valueChanges();
  }
}
