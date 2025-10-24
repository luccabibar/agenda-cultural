import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDiariaComponent } from './agenda-diaria.component';

describe('AgendaDiariaComponent', () => {
  let component: AgendaDiariaComponent;
  let fixture: ComponentFixture<AgendaDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaDiariaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
