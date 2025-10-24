import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaSemanalComponent } from './agenda-semanal.component';

describe('AgendaSemanalComponent', () => {
  let component: AgendaSemanalComponent;
  let fixture: ComponentFixture<AgendaSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaSemanalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
