import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociosList } from './socios-list';

describe('SociosList', () => {
  let component: SociosList;
  let fixture: ComponentFixture<SociosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SociosList],
    }).compileComponents();

    fixture = TestBed.createComponent(SociosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
