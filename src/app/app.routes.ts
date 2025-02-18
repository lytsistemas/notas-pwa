import { RouterModule, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
    { path: '', component: NotesComponent },
];
