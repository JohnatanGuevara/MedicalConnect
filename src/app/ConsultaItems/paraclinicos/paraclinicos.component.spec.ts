import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaclinicosComponent } from './paraclinicos.component';

describe('ParaclinicosComponent', () => {
  let component: ParaclinicosComponent;
  let fixture: ComponentFixture<ParaclinicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParaclinicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParaclinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
