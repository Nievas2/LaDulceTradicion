import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregFrecuentesComponent } from './preg-frecuentes.component';

describe('PregFrecuentesComponent', () => {
  let component: PregFrecuentesComponent;
  let fixture: ComponentFixture<PregFrecuentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregFrecuentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregFrecuentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
