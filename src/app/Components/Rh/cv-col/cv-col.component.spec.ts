import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvColComponent } from './cv-col.component';

describe('CvColComponent', () => {
  let component: CvColComponent;
  let fixture: ComponentFixture<CvColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
