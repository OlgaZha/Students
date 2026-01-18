import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBoardComponent } from './generic-board.component';

describe('GenericBoardComponent', () => {
  let component: GenericBoardComponent;
  let fixture: ComponentFixture<GenericBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
