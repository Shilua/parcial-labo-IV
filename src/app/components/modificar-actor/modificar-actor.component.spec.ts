import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarActorComponent } from './modificar-actor.component';

describe('ModificarActorComponent', () => {
  let component: ModificarActorComponent;
  let fixture: ComponentFixture<ModificarActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
