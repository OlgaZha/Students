import {Component, computed, input, model, TemplateRef} from '@angular/core';
import {NgClass, NgTemplateOutlet} from '@angular/common';

interface SimpleGroup<T>{
  name: string;
  items: T[];
}

@Component({
  selector: 'app-generic-board',
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './generic-board.component.html',
  styleUrl: './generic-board.component.scss'
})
export class GenericBoardComponent<T> {
  items = input<T[]>([]);
  groupBy = input.required<(item:T)=>string | null>();
  itemTemplate = input.required<TemplateRef<{$implicit: T}>>();

  groupsPageSize = input<number>(5);
  currentPage = model<number>(1);
  groupsTotalPages = computed(() => {
    let totalGroups = this.groups().length;
    return Math.ceil(totalGroups/this.groupsPageSize());
  })

  pagedGroups = computed(() => {
    let start = (this.currentPage() - 1) * this.groupsPageSize();
    let end = start + this.groupsPageSize();
    return this.groups().slice(start, end);
  })

  groups = computed<SimpleGroup<T>[]>(() => {
    let map = new Map<string, T[]>();
    let items = this.items();
    let groupByFunction = this.groupBy();
    for(let i of items) {
      let groupName = groupByFunction(i) || 'no group';
      if(!map.has(groupName)) {
        map.set(groupName, []);
      }
      map.get(groupName)?.push(i);
    }

    return Array.from(map.entries()).map(([name, items]) => ({
      name, items
    }));
  })

  previous() {
    if(this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
  next() {
    if(this.groupsTotalPages() > this.currentPage()) {
      this.currentPage.set(this.currentPage() + 1);
    }
}
}
