import { Routes } from '@angular/router';
import {StudentsListComponent} from './pages/students-list/students-list.component';
import {EditComponent} from './edit/edit.component';

export const routes: Routes = [{ path: '', redirectTo: 'students', pathMatch: 'full' },
  {path: 'students', component: StudentsListComponent},
  {path: 'students/:id/edit', component: EditComponent},
];
