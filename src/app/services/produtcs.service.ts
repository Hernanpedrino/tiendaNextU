import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../interfaces/product.';

@Injectable({
  providedIn: 'root'
})
export class ProdutcsService {
  constructor(private firestore: AngularFirestore) { }

  getProducts (){
    return this.firestore.
    collection<Product>('productos').
    valueChanges();
  }
  getProductById(id:string){
    return this.firestore
    .collection<Product>('productos')
    .doc(`${id}`)
    .get();
  }
  updateProductById(id:string, cantidad:number){
    return this.firestore
    .collection<Product>('productos')
    .doc(`${id}`)
    .update({
      stock: cantidad
    })
  }
}
