import { Component, Input } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { NgForOf, SlicePipe, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AgendaComponent } from '../agenda.component';
import { AgendaMode } from '../agendaMode';

@Component({
  selector: 'app-celula-agenda',
  standalone: true,
  imports: [NgForOf, SlicePipe, RouterLink, NgIf],
  templateUrl: './celula-agenda.component.html',
  styleUrl: './celula-agenda.component.scss'
})
export class CelulaAgendaComponent
{
  @Input("eventos") eventos: Evento[] = [];
  
  @Input("mostrarMais") mais: boolean = true;
  
  @Input("data") data?: Date;

  @Input("maxSize") maxSize: number = 255;

  constructor(
    private router: Router
  ) {
    
  }

  navegaAgendaDiaria(): void
  {
    if(!this.data) console.log("CelulaAgendaComponent: data indefinida ao navegar para agenda diaria");
    
    AgendaComponent.navegarParaAgenda(this.router, AgendaMode.DIARIA, this.data);
  }
}
