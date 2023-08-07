import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasSecundariasComponent } from './paginas-secundarias.component';

describe('PaginasSecundariasComponent', () => {
  let component: PaginasSecundariasComponent;
  let fixture: ComponentFixture<PaginasSecundariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginasSecundariasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginasSecundariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
