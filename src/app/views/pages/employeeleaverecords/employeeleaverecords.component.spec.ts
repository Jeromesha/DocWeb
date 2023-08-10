import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeleaverecordsComponent } from './employeeleaverecords.component';

describe('EmployeeleaverecordsComponent', () => {
  let component: EmployeeleaverecordsComponent;
  let fixture: ComponentFixture<EmployeeleaverecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeleaverecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeleaverecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
