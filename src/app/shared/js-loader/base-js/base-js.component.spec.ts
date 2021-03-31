import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseJsComponent } from './base-js.component';

describe('BaseJsComponent', () => {
  let component: BaseJsComponent;
  let fixture: ComponentFixture<BaseJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
