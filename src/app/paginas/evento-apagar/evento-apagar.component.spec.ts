import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoApagarComponent } from './evento-apagar.component';

describe('EventoApagarComponent', () => {
  let component: EventoApagarComponent;
  let fixture: ComponentFixture<EventoApagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoApagarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoApagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
