import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklytimesheetaprovelComponent } from './weeklytimesheetaprovel.component';

describe('WeeklytimesheetaprovelComponent', () => {
  let component: WeeklytimesheetaprovelComponent;
  let fixture: ComponentFixture<WeeklytimesheetaprovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklytimesheetaprovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklytimesheetaprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
