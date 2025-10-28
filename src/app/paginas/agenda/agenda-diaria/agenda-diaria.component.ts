import { Component, Input } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { BuscarDados, BuscarParams } from '../../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { DatetimeUtil } from '../../../../utils/datetime';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';

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

  @Input("filtros") filtros: BuscarDados;

  // implementado com Subject a fim de sincronizar comportamento apos mudanca
  data: Date;
  @Input("data") set setData(dt: Date | null)
  {
    if(dt){
      this.data = dt;
      this.dataNext();
    }
  }

  constructor(
    private acService: AgendaCulturalService
  ) {
    this.filtros = new BuscarDados();

    this.data = new Date();
    this.dataNext();

    this.eventos = [];
  }

  dataNext(): void
  {
    let params = new BuscarDados();
    let dateBuff: Date = new Date(this.data); 
    
    dateBuff.setHours(0, 0, 0, 0);
    params.diaLower = DatetimeUtil.dateToISODate(dateBuff); 

    dateBuff.setDate(dateBuff.getDate() + 1);
    params.diaUpper = DatetimeUtil.dateToISODate(dateBuff);

    console.log("dateNext:", params);   

    // BUSCA EVENTOS
    this.acService.buscarEventos(params).subscribe({
      next: this.eventosNext,
      error: this.eventosError 
    })
  }


  eventosNext = (res: Resposta<Evento[]>): void => 
  {
    if(res.response){
      this.eventos = res.response;
    }
    else{
      console.log(":(((");
    }

    console.log(this.eventos);
  }


  eventosError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
  }
}
