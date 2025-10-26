import { Component, Input } from '@angular/core';
import { Evento } from '../../../../../interfaces/evento';

@Component({
  selector: 'app-celula-agenda',
  standalone: true,
  imports: [],
  templateUrl: './celula-agenda.component.html',
  styleUrl: './celula-agenda.component.scss'
})
export class CelulaAgendaComponent
{
  @Input("eventos") eventos: Evento[];

  constructor()
  {
    this.eventos = [];
  }
}
