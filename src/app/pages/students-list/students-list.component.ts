import {Component, inject, input} from '@angular/core';
import {ColumnDef, Student} from '../../models';
import {StudentsStoreService} from '../../store/students-store.service';
import {GenericGridComponent} from '../../ui-components/generic-grid/generic-grid.component';

@Component({
  selector: 'app-students-list',
  imports: [
    GenericGridComponent
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

  store = inject(StudentsStoreService);

  onPageChange(newPage: number) {
    this.store.pageChanged(newPage);
  }
}
