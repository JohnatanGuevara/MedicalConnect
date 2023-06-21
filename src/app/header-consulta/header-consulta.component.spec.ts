import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConsultaComponent } from './header-consulta.component';

describe('HeaderConsultaComponent', () => {
  let component: HeaderConsultaComponent;
  let fixture: ComponentFixture<HeaderConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
