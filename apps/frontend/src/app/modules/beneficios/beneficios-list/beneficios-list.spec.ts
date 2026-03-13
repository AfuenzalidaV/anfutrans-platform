import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiosList } from './beneficios-list';

describe('BeneficiosList', () => {
  let component: BeneficiosList;
  let fixture: ComponentFixture<BeneficiosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiosList],
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
