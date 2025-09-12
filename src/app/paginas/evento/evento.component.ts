import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { Evento } from '../../../interfaces/evento';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent {

  evento: Evento | null;

  constructor(
    private acService: AgendaCulturalService,
    private activatedRoute: ActivatedRoute
  ) {
    // inicializa objetos
    this.evento = null;

    // recebe parametros
    let id: string | null = activatedRoute.snapshot.paramMap.get('id')
    if(id == null){
      return;
    }
    
    // processa parametros
    let idNum: number = parseInt(id);
    if(isNaN(idNum)){
      return;
    }

    // realiza requests necessarios
    acService.getEvento(idNum).subscribe(
    (result) => {
      // TODO: catch 404
      console.log(result);
      this.evento = result.response;
    });
  }
}
