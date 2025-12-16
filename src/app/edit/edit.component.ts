import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
    route = inject(Router);
    routeActivate = inject(ActivatedRoute);

    ngOnInit() {
      let id = this.routeActivate.snapshot.paramMap.get('id');
    }
}
