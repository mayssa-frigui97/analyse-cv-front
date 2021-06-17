import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurPoleComponent } from './collaborateur-pole.component';

describe('CollaborateurPoleComponent', () => {
  let component: CollaborateurPoleComponent;
  let fixture: ComponentFixture<CollaborateurPoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateurPoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateurPoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
