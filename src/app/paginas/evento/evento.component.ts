import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { Evento, StatusEvento } from '../../../interfaces/evento';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { NotFoundMode } from '../notfound/notFoundMode';
import { NotfoundComponent } from '../notfound/notfound.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss'
})
export class EventoComponent 
{
  id: string | null;
  evento: Evento | null;

  constructor(
    private acService: AgendaCulturalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // inicializa objetos
    this.evento = null;

    // recebe parametros
    this.id = activatedRoute.snapshot.paramMap.get('id')

    if(this.id == null){
      NotfoundComponent.navegarParaNotFound(router, NotFoundMode.EVENTO, this.id);
      return;
    }
      
    // processa parametros
    let idNum: number = parseInt(this.id);
    if(isNaN(idNum)){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
      return;
    }

    // realiza requests necessarios
    acService.getEvento(idNum).subscribe({
      next: this.eventoNext,
      error: this.eventoError
    });
  }


  eventoNext = (res: Resposta<Evento>): void =>
  {
    // TODO: resolver essa bucha aqui NO BACK
    // verificar se nao eh dono do evento acessando esse?
    if(res.response && res.response.status != StatusEvento.APROVADO)
      this.evento = res.response;

    else
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
  }


  eventoError = (res: HttpResponse<unknown>): void =>
  {
    console.log("error: ", res);
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
  }
}
