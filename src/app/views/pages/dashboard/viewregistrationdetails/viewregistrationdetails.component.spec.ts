import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewregistrationdetailsComponent } from './viewregistrationdetails.component';

describe('ViewregistrationdetailsComponent', () => {
  let component: ViewregistrationdetailsComponent;
  let fixture: ComponentFixture<ViewregistrationdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewregistrationdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewregistrationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
