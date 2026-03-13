import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramiteForm } from './tramite-form';

describe('TramiteForm', () => {
  let component: TramiteForm;
  let fixture: ComponentFixture<TramiteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TramiteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TramiteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
