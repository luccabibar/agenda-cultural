import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../services/agenda-cultural-service/agenda-cultural.service';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {

  constructor(private acService: AgendaCulturalService)
  {
    acService.getEvento(1).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }

}
