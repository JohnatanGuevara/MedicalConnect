import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NOTAOPERATORIAComponent } from './notaoperatoria.component';

describe('NOTAOPERATORIAComponent', () => {
  let component: NOTAOPERATORIAComponent;
  let fixture: ComponentFixture<NOTAOPERATORIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NOTAOPERATORIAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NOTAOPERATORIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
