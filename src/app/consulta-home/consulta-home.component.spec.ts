import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaHOMEComponent } from './consulta-home.component';

describe('ConsultaHOMEComponent', () => {
  let component: ConsultaHOMEComponent;
  let fixture: ComponentFixture<ConsultaHOMEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaHOMEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaHOMEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
