import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Evento } from '../../../../interfaces/evento';

@Component({
  selector: 'app-evento-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evento-card.component.html',
  styleUrl: './evento-card.component.scss'
})
export class EventoCardComponent
{
  evento!: Evento;
  eventoUrl : string = ""; 

  @Input("evento") set setEvento(ev: Evento){
    if(ev){
      this.evento = ev;
      this.eventoUrl = ev.getEventoResource();
    }
  }
}
