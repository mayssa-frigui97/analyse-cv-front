import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJsComponent } from './dashboard-js.component';

describe('DashboardJsComponent', () => {
  let component: DashboardJsComponent;
  let fixture: ComponentFixture<DashboardJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
