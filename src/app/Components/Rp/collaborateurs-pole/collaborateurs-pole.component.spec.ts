import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateursPoleComponent } from './collaborateurs-pole.component';

describe('CollaborateursPoleComponent', () => {
  let component: CollaborateursPoleComponent;
  let fixture: ComponentFixture<CollaborateursPoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateursPoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateursPoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
