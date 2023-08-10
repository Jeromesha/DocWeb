import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklytimesheetaprovedComponent } from './weeklytimesheetaproved.component';

describe('WeeklytimesheetaprovedComponent', () => {
  let component: WeeklytimesheetaprovedComponent;
  let fixture: ComponentFixture<WeeklytimesheetaprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklytimesheetaprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklytimesheetaprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
