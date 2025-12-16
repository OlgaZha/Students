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

  groupFilter = signal<string | null>(null);
  ageFrom = signal<number>(0);
  ageTo = signal<number>(0);

  createdFrom = signal<string | null>('');
  createdTo = signal<string | null>('');

  constructor(private http: HttpClient) {
    effect(() => {
      this.page();
      this.searchTerm();
      this.groupFilter();
      this.ageFrom();
      this.ageTo();
      this.createdFrom();
      this.createdTo();
      this.loadStudents();
    });
  }

  loadStudents() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Student[]>(`${this.apiBaseUrl}/students`)
      .subscribe({
        next: all => {
          let filtered = all;
          let search = this.searchTerm().trim().toLowerCase();
          const from = this.createdFrom();
          const to = this.createdTo();
          if(search) {
            filtered = filtered.filter(student => student.name.toLowerCase().includes(search) || student.email.toLowerCase().includes(search));
          }
          if(this.groupFilter()){
            filtered = filtered.filter(student => student.group === this.groupFilter());
          }
          if(this.ageFrom()){
            filtered = filtered.filter(student => student.age >= this.ageFrom());
          }
          if(this.ageTo()){
            filtered = filtered.filter(student => student.age <= this.ageTo());
          }
          if(from){
            const fromTime = new Date(from).getMilliseconds();
            filtered = filtered.filter(student => {
              return student.createdAt * 1000 >= fromTime
            });
          }
          if(to){
            const toTime = new Date(to).getMilliseconds();
            filtered = filtered.filter(student => student.createdAt * 1000 <= toTime);
          }
          this.total.set(filtered.length);
          let start = (this.page() - 1) * this.pageSize();
          let end = start + this.pageSize();
          filtered = filtered.slice(start, end);
          this.students.set(filtered);
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

  groupChanged(newGroup: string) {
    this.groupFilter.set(newGroup);
  }

  setCreatedRange(createdFrom: string | null, createdTo:string | null){
    this.createdFrom.set(createdFrom);
    this.createdTo.set(createdTo);
    this.page.set(1);
  }

  resetFilters() {
    this.searchTerm.set('');
    this.groupFilter.set(null);
    this.ageFrom.set(0);
    this.ageTo.set(0);
    this.page.set(1);
    this.createdFrom.set('');
    this.createdTo.set('');
  }

}
