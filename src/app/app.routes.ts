import { Routes } from '@angular/router';
import {StudentsListComponent} from './pages/students-list/students-list.component';

export const routes: Routes = [{ path: '', redirectTo: 'students', pathMatch: 'full' },
  {path: 'students', component: StudentsListComponent}];
