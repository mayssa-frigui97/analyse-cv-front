import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCandComponent } from './cv-cand.component';

describe('CvCandComponent', () => {
  let component: CvCandComponent;
  let fixture: ComponentFixture<CvCandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvCandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
