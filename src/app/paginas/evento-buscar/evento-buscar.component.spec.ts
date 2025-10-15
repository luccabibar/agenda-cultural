import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoBuscarComponent } from './evento-buscar.component';

describe('EventoBuscarComponent', () => {
  let component: EventoBuscarComponent;
  let fixture: ComponentFixture<EventoBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoBuscarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
