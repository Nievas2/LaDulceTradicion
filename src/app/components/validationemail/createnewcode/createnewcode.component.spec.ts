import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewcodeComponent } from './createnewcode.component';

describe('CreatenewcodeComponent', () => {
  let component: CreatenewcodeComponent;
  let fixture: ComponentFixture<CreatenewcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
