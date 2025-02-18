import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {

  private notesCollection;

  constructor(private firestore: Firestore) {
    // Inicializa la colección de notas en Firestore
    this.notesCollection = collection(this.firestore, 'notes');
  }

  // Obtiene todas las notas de la colección como un Observable
  getNotes(): Observable<Note[]> {
    return collectionData(this.notesCollection, { idField: 'id' }) as Observable<Note[]>;
  }

  // Añade una nueva nota a la colección
  addNote(note: Note): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.notesCollection, note);
  }

  // Elimina una nota de la colección por su ID
  deleteNote(id: string): Promise<void> {
    const noteDoc = doc(this.firestore, `notes/${id}`);
    return deleteDoc(noteDoc);
  }
}
