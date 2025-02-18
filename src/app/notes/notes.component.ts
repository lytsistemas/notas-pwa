import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Note } from '../models/note.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class NotesComponent {
  // Array para almacenar las notas
  notes: Note[] = [];
  // Objeto para almacenar la nueva nota que se está creando
  newNote: Note = { title: '', content: '', createdAt: new Date() };

  constructor(private noteService: NoteService) {
    // Obtener las notas existentes del servicio y asignarlas al array de notas
    this.noteService.getNotes().subscribe((notes) => (this.notes = notes));
  }

  // Booleano para rastrear el estado en línea/fuera de línea
  isOffline = !navigator.onLine;

  ngOnInit() {
    // Agregar event listeners para actualizar el estado en línea/fuera de línea
    window.addEventListener('online', () => this.isOffline = false);
    window.addEventListener('offline', () => this.isOffline = true);
  }

  addNote() {
    // Agregar una nueva nota si el título y el contenido no están vacíos
    if (this.newNote.title && this.newNote.content) {
      this.noteService.addNote({ ...this.newNote, createdAt: new Date() });
      // Reiniciar el objeto newNote
      this.newNote = { title: '', content: '', createdAt: new Date() };
    }
  }

  deleteNote(id: string) {
    // Eliminar una nota por su id
    this.noteService.deleteNote(id);
  }
}
