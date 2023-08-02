import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetgridComponent } from './timesheetgrid.component';

describe('TimesheetgridComponent', () => {
  let component: TimesheetgridComponent;
  let fixture: ComponentFixture<TimesheetgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
