import { Component } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';

@Component({
  selector: 'app-agenda-diaria',
  standalone: true,
  imports: [],
  templateUrl: './agenda-diaria.component.html',
  styleUrl: './agenda-diaria.component.scss'
})
export class AgendaDiariaComponent
{
  eventos: Evento[];

  constructor()
  {
    this.eventos = [];
  }
}
