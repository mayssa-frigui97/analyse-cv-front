import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableJsComponent } from './data-table-js.component';

describe('DataTableJsComponent', () => {
  let component: DataTableJsComponent;
  let fixture: ComponentFixture<DataTableJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableJsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
