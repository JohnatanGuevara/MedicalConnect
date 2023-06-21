import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapacientesComponent } from './listapacientes.component';

describe('ListapacientesComponent', () => {
  let component: ListapacientesComponent;
  let fixture: ComponentFixture<ListapacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListapacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListapacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
