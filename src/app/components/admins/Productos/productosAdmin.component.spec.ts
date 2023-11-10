import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdminComponent } from './productosAdmin.component';

describe('ProductosComponent', () => {
  let component: ProductosAdminComponent;
  let fixture: ComponentFixture<ProductosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
