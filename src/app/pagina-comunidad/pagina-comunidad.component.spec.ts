import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaComunidadComponent } from './pagina-comunidad.component';

describe('PaginaComunidadComponent', () => {
  let component: PaginaComunidadComponent;
  let fixture: ComponentFixture<PaginaComunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaComunidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
