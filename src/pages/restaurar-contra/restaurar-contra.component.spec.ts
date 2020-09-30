import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarContraComponent } from './restaurar-contra.component';

describe('RestaurarContraComponent', () => {
  let component: RestaurarContraComponent;
  let fixture: ComponentFixture<RestaurarContraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurarContraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurarContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
