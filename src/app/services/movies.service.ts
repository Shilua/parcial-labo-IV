import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(
    private firestore: AngularFirestore,
    public fireStorage: AngularFireStorage
  ) {}

  getElements() {
    return this.firestore.collection('peliculas').ref;
    // .onSnapshot((snapshot) => {
    //    snapshot.docs.map((element: any) => {
    //      this.elementos.push({
    //        id: element.id,
    //        data: element.data(),
    //      });
    //    });
    // });
  }

  deleteElement(targetElement) {
    this.firestore
      .collection('peliculas')
      .doc(targetElement)
      .update({ isActive: false });
  }

  modifyElement(targetElement, fileToUpload) {
    if (fileToUpload) {
      const file = fileToUpload;
      const randomId = Math.random().toString(36).substring(2);
      targetElement.data.fotoDeLaPelicula = randomId;
      const fileRef = this.fireStorage.storage.ref(`peliculas/${randomId}.jpg`);
      fileRef.put(file);
    }

    this.firestore.collection('peliculas').doc(targetElement.id).update({
      nombre: targetElement.data.nombre,
      tipo: targetElement.data.tipo,
      cantidadDePublico: targetElement.data.cantidadDePublico,
      fotoDeLaPelicula: targetElement.data.fotoDeLaPelicula,
      fechaDeEstreno: targetElement.data.fechaDeEstreno,
    });
  }

  createElement(targetElement, photo) {
    if (photo) {
      const file = photo;
      const randomId = Math.random().toString(36).substring(2);
      targetElement.fotoDeLaPelicula = randomId;
      const fileRef = this.fireStorage.storage.ref(`peliculas/${randomId}.jpg`);
      fileRef.put(file);
    } else {
      targetElement.fotoDeLaPelicula = 'placeholdermovie';
    }
    targetElement.isActive = true;
    this.firestore.collection('peliculas').add(targetElement);
  }

  async getMoviePhoto(id: string) {
    return this.fireStorage.storage.ref(`peliculas/${id}.jpg`).getDownloadURL();
  }
}
