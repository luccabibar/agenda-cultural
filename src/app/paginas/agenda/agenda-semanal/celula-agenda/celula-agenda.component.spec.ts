import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelulaAgendaComponent } from './celula-agenda.component';

describe('CelulaAgendaComponent', () => {
  let component: CelulaAgendaComponent;
  let fixture: ComponentFixture<CelulaAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CelulaAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelulaAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
