import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pdf1PruebaComponent } from './pdf1-prueba.component';

describe('Pdf1PruebaComponent', () => {
  let component: Pdf1PruebaComponent;
  let fixture: ComponentFixture<Pdf1PruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pdf1PruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pdf1PruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
