import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosFiliatoriosComponent } from './datos-filiatorios.component';

describe('DatosFiliatoriosComponent', () => {
  let component: DatosFiliatoriosComponent;
  let fixture: ComponentFixture<DatosFiliatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosFiliatoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosFiliatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
