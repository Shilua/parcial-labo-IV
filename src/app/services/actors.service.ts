import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  constructor(
    private firestore: AngularFirestore,
    public fireStorage: AngularFireStorage
  ) {}

  getElements() {
    return this.firestore.collection('actores').ref;
  }
  async getActorPhoto(id: string) {
    return this.fireStorage.storage.ref(`actores/${id}.jpg`).getDownloadURL();
  }

  createElement(actor: any, photo: any) {
    if (photo) {
      const file = photo;
      const randomId = Math.random().toString(36).substring(2);
      actor.foto = randomId;
      const fileRef = this.fireStorage.storage.ref(`actores/${randomId}.jpg`);
      fileRef.put(file);
    } else {
      actor.foto = 'placeholder';
    }
    actor.isActive = true;
    this.firestore.collection('actores').add(actor);
  }
}
