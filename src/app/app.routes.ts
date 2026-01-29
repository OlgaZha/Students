import { Routes } from '@angular/router';
import {StudentsListComponent} from './pages/students-list/students-list.component';
import {EditComponent} from './edit/edit.component';
import {GroupsComponent} from './groups/groups.component';

export const routes: Routes = [{ path: '', redirectTo: 'students', pathMatch: 'full' },
  {path: 'students', component: StudentsListComponent},
  {path: 'students/:id/edit', component: EditComponent},
  {path: 'students/create', component: EditComponent},
  {path: 'groups', component: GroupsComponent},
];
