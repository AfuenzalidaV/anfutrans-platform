import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesList } from './tramites-list';

describe('TramitesList', () => {
  let component: TramitesList;
  let fixture: ComponentFixture<TramitesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TramitesList],
    }).compileComponents();

    fixture = TestBed.createComponent(TramitesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
