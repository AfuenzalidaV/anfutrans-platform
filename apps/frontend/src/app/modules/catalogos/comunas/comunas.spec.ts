import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Comunas } from './comunas';

describe('Comunas', () => {
  let component: Comunas;
  let fixture: ComponentFixture<Comunas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Comunas],
    }).compileComponents();

    fixture = TestBed.createComponent(Comunas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
