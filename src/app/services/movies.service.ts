import { Injectable } from '@angular/core';
import {
  AngularFirestore
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
  }

  deleteElement(movie: any) {
    this.firestore
      .collection('peliculas')
      .doc(movie)
      .update({ isActive: false });
  }

  modifyElement(movie :any, imageToUpload: any) {
    if (imageToUpload) {
      const file = imageToUpload;
      const randomId = Math.random().toString(36).substring(2);
      movie.data.fotoDeLaPelicula = randomId;
      const fileRef = this.fireStorage.storage.ref(`peliculas/${randomId}.jpg`);
      fileRef.put(file);
    }

    this.firestore.collection('peliculas').doc(movie.id).update({
      nombre: movie.data.nombre,
      tipo: movie.data.tipo,
      cantidadDePublico: movie.data.cantidadDePublico,
      fotoDeLaPelicula: movie.data.fotoDeLaPelicula,
      fechaDeEstreno: movie.data.fechaDeEstreno,
    });
  }

  createElement(movie: any, photo: any) {
    if (photo) {
      const file = photo;
      const randomId = Math.random().toString(36).substring(2);
      movie.fotoDeLaPelicula = randomId;
      const fileRef = this.fireStorage.storage.ref(`peliculas/${randomId}.jpg`);
      fileRef.put(file);
    } else {
      movie.fotoDeLaPelicula = 'placeholdermovie';
    }
    movie.isActive = true;
    this.firestore.collection('peliculas').add(movie);
  }

  async getMoviePhoto(id: string) {
    return this.fireStorage.storage.ref(`peliculas/${id}.jpg`).getDownloadURL();
  }
}
