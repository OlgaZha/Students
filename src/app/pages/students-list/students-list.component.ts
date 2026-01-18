import {Component, inject, input, model} from '@angular/core';
import {ColumnDef, Student} from '../../models';
import {StudentsStoreService} from '../../store/students-store.service';
import {GenericGridComponent} from '../../ui-components/generic-grid/generic-grid.component';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {NavbarComponent} from '../../navbar/navbar.component';

@Component({
  selector: 'app-students-list',
  imports: [
    GenericGridComponent,
    FormsModule,
    NgForOf,
    NavbarComponent
  ],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
  studentsColumns: ColumnDef<Student>[] = [
    {key: 'name', label: 'Name', width: '20%'},
    {key: 'email', label: 'Email', width: '20%'},
    {key: 'group', label: 'Group', width: '20%'},
    {key: 'age', label: 'Age', width: '20%'}
  ];
  groups: string[] = ['group 1', 'group 2', 'group 3', 'group 4', 'group 5', 'group 6'];

  store = inject(StudentsStoreService);
  router = inject(Router);

  group = model(this.store.groupFilter);

  onPageChange(newPage: number) {
    this.store.pageChanged(newPage);
  }

  onGroupChange(groupName: string) {
    this.store.groupChanged(groupName);
    this.store.page.set(1);
  }

  onCreatedChanged(createdFrom: string | null, createdTo: string | null) {
    this.store.setCreatedRange(createdFrom, createdTo);
  }

  onEditChanged(row: Student) {
    this.router.navigate(['/students', row.id, 'edit']);
  }

  onCreateUser(){
    this.router.navigate(['/students/create']);
  }
}
