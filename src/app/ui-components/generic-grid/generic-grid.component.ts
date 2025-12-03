import {Component, input} from '@angular/core';
import {ColumnDef} from '../../models';

@Component({
  selector: 'app-generic-grid',
  imports: [],
  templateUrl: './generic-grid.component.html',
  styleUrl: './generic-grid.component.scss'
})
export class GenericGridComponent<T> {
  data = input.required<T[]>();
  columns = input.required<ColumnDef<T>>();
}
