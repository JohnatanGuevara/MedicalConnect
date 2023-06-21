import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeConsultaComponent } from './datos-de-consulta.component';

describe('DatosDeConsultaComponent', () => {
  let component: DatosDeConsultaComponent;
  let fixture: ComponentFixture<DatosDeConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosDeConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosDeConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
