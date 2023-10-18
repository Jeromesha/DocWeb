import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetreportComponent } from './timesheetreport.component';

describe('TimesheetreportComponent', () => {
  let component: TimesheetreportComponent;
  let fixture: ComponentFixture<TimesheetreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
