import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EVPREOPERATORIAComponent } from './evpreoperatoria.component';

describe('EVPREOPERATORIAComponent', () => {
  let component: EVPREOPERATORIAComponent;
  let fixture: ComponentFixture<EVPREOPERATORIAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EVPREOPERATORIAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EVPREOPERATORIAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
