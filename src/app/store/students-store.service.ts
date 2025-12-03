import {effect, Injectable, signal} from '@angular/core';
import {Student} from '../models';
import {HttpClient} from '@angular/common/http';
import {switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsStoreService {
  apiBaseUrl = 'https://6927242526e7e41498fd2ed6.mockapi.io/'

  students = signal<Student[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  page = signal(1);
  pageSize = signal(10);
  total = signal(0);

  searchTerm = signal('');

  constructor(private http: HttpClient) {
    effect(() => {
      this.page();
      this.loadStudents()
    });
  }

  loadStudents() {
    this.loading.set(true);
    this.error.set(null);
    let search = this.searchTerm().trim();
    let searchParam = search ? `?search=${search}` : '';

    this.http.get<Student[]>(`${this.apiBaseUrl}/students${searchParam}`).pipe(
      tap(students => this.total.set(students.length)),
      switchMap(() => {
        return this.http.get<Student[]>(`${this.apiBaseUrl}/students?page=${this.page()}&limit=${this.pageSize()}`);
      })
    ).subscribe({
      next : (students: Student[]) => {
        this.students.set(students);
        this.loading.set(false);
      },
      error: error => {
        this.loading.set(false);
        this.error.set('Failed to load students');
      }
  })
  }

  pageChanged(newPage: number) {
    this.page.set(newPage);
  }

}
