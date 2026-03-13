import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficioForm } from './beneficio-form';

describe('BeneficioForm', () => {
  let component: BeneficioForm;
  let fixture: ComponentFixture<BeneficioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficioForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
