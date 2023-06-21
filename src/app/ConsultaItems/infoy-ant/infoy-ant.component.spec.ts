import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoyAntComponent } from './infoy-ant.component';

describe('InfoyAntComponent', () => {
  let component: InfoyAntComponent;
  let fixture: ComponentFixture<InfoyAntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoyAntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoyAntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
