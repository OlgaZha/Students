import {Component, inject, OnInit} from '@angular/core';
import {GenericBoardComponent} from '../ui-components/generic-board/generic-board.component';
import {Student} from '../models';
import {StudentsStoreService} from '../store/students-store.service';

@Component({
  selector: 'app-groups',
  imports: [
    GenericBoardComponent
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})

export class GroupsComponent implements OnInit {
  studentsStore = inject(StudentsStoreService)
  readonly byGroup = (student: Student) => {
    return student.group;
  }

  ngOnInit(): void {
    this.studentsStore.fetchStudents();
  }

}
