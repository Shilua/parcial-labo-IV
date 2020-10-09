import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarActorComponent } from './borrar-actor.component';

describe('BorrarActorComponent', () => {
  let component: BorrarActorComponent;
  let fixture: ComponentFixture<BorrarActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrarActorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
