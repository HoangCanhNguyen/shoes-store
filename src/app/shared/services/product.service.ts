import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  createProduct(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('products')
        .add(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  getProducts() { 
    return this.firestore.collection("products").snapshotChanges();
  }
}
