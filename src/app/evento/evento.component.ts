import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../services/agenda-cultural-service/agenda-cultural.service';
import { Evento } from '../../interfaces/evento';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {

  evento: Evento | null;

  constructor(private acService: AgendaCulturalService)
  {
    this.evento = null;

    acService.getEvento(1).subscribe(
      (result) => {
        console.log(result);

        this.evento = result.response;
      }
    )
  }

}
