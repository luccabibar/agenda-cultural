import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoAnalisarComponent } from './evento-analisar.component';

describe('EventoAnalisarComponent', () => {
  let component: EventoAnalisarComponent;
  let fixture: ComponentFixture<EventoAnalisarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoAnalisarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoAnalisarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
