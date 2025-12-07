import {Component, computed, input, output} from '@angular/core';
import {ColumnDef} from '../../models';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-generic-grid',
  imports: [
    NgClass
  ],
  templateUrl: './generic-grid.component.html',
  styleUrl: './generic-grid.component.scss'
})
export class GenericGridComponent<T extends {id: string | number}> {
  data = input.required<T[]>();
  columns = input.required<ColumnDef<T>[]>();
  // page - current page
  page = input.required<number>();
  // pageSize - records per page
  pageSize = input.required<number>();
  // records id API
  total = input.required<number>();
  pageChanged = output<number>();

  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  next() {
    if(this.totalPages() > this.page()) {
      this.pageChanged.emit(this.page() + 1);
    }
  }

  previous() {
    if(this.page() > 1) {
      this.pageChanged.emit(this.page() - 1);
    }
  }
}
