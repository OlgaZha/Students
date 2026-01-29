import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../models';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StudentsStoreService} from '../store/students-store.service';

@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
})
export class EditComponent implements OnInit {
    route = inject(Router);
    routeActivate = inject(ActivatedRoute);
    fb = inject(FormBuilder);
    studentsService = inject(StudentsStoreService)

    student = signal<Student | null>(null);
    isLoading = signal<boolean>(true);
    form!: FormGroup;

    ngOnInit() {
      let id = this.routeActivate.snapshot.paramMap.get('id');
      if(id) {
        // edit
        let existedStudent = this.studentsService.students().find(student => student.id === id);
        if(existedStudent) {
          this.student.set(existedStudent);
          this.buildForm(existedStudent);
        }
      } else {
        // create
        let emptyStudent: Student = {
          id: '',
          name: '',
          email: '',
          group: '',
          age: 20,
          createdAt: Date.now(),
        }
        this.student.set(emptyStudent);
        this.buildForm(emptyStudent);
      }
      this.isLoading.set(false);
    }

    private buildForm(student: Student) {
      this.form = this.fb.group({
        name: new FormControl(student.name, [Validators.required, Validators.maxLength(20)]),
        email: new FormControl(student.email, [Validators.required, Validators.email]),
        group: new FormControl(student.group, [Validators.required, Validators.maxLength(20)]),
        age: new FormControl(student.age, [Validators.required, Validators.min(18)]),
      })
    }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    let currentStudent = this.student();
    let payload: Student = {...currentStudent, ...this.form.value}
    if(payload.id) {
      this.studentsService.updateStudent(payload.id, payload).subscribe({
          next: () => {
            this.route.navigate(['students']);
          },
          error: error => {
            console.log(error);
          }
        }
      )
      return;
    }
    return this.studentsService.createStudent(payload).subscribe({
      next: () => {
        this.route.navigate(['students']);
      },
      error: error => {
        console.log(error);
      }
    })

  }
}
