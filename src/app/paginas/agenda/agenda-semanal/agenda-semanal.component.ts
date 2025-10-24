import { Component } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { BuscarDados, BuscarParams  } from '../../../../interfaces/buscar';
import { DatetimeUtil } from '../../../../utils/datetime';
import { Data } from '@angular/router';

@Component({
  selector: 'app-agenda-semanal',
  standalone: true,
  imports: [],
  templateUrl: './agenda-semanal.component.html',
  styleUrl: './agenda-semanal.component.scss'
})
export class AgendaSemanalComponent
{
  eventos: DataEventos[];


  getHoje(): Date
  {
    let hoje: Date = new Date(Date.now());
    hoje.setHours(0, 0, 0, 0);

    return hoje
  }


  getDomingos(ref: Date): [Date, Date]
  {
    const diaSemana: number = ref.getDay(); // 0 a 6

    // Domingo desta semana      
    let domAnt = new Date(ref);
    domAnt.setDate(domAnt.getDate() - diaSemana);
    
    // Proximo domingo    
    let domProx = new Date(ref);
    domProx.setDate(domProx.getDate() + (6 - diaSemana + 1));

    return [domAnt, domProx];
  }


  getParamsEvento(): BuscarDados
  {
    let domingoAnterior, domingoProximo: Date;
    [domingoAnterior, domingoProximo] = this.getDomingos(this.getHoje());

    let params = new BuscarDados();

    params.diaLower = DatetimeUtil.dateToISODate(domingoAnterior); 
    params.diaUpper = DatetimeUtil.dateToISODate(domingoProximo); 

    return params;
  }  


  organizaEventos(eventos: Evento[]): DataEventos[]
  {
    let domingoAnterior, domingoProximo: Date;
    [domingoAnterior, domingoProximo] = this.getDomingos(this.getHoje());


    let arrayKeys = new Map<string, number>();

    let dataEvs: DataEventos[] = [];

    // itera de um domingo ao proximo
    for(let dd = domingoAnterior; dd <= domingoProximo; dd.setDate(dd.getDate() + 1)){
      let novaData = dd.toDateString();

      // adiciona novo data-evento
      dataEvs.push(new DataEventos(new Date(novaData)));
      // anota data que correspodne a este indice
      arrayKeys.set(novaData, dataEvs.length - 1);
    }
    
    // itera sobre eventos
    for(let curr of eventos){
      
      let dataCurr = new Date(curr.horarioInicio as string).toDateString();

      // se a data esta presente no array de chaves (ou seja, se a data corresponde a de um dos objetos data-evento)
      if(dataCurr && arrayKeys.has(dataCurr))
        // adiciona aos eventos daquela data-evento
        dataEvs[ arrayKeys.get(dataCurr) as number ].eventos.push(curr);
      else
        console.log(curr, dataCurr);
    }

    return dataEvs;
  }


  constructor(
    private acService: AgendaCulturalService
  ) {
    
    this.eventos = [];

    let params = this.getParamsEvento();

    acService.buscarEventos(params).subscribe({
      next: this.eventosNext,
      error: this.eventosError 
    })
  }

  eventosNext = (res: Resposta<Evento[]>):void => 
  {
    if(res.response)
     this.eventos = this.organizaEventos(res.response);
    else
      console.log(":(((");

    console.log(this.eventos);
    
  }


  eventosError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
  }
}


class DataEventos
{
  data: Data
  eventos: Evento[]

  constructor(dt: Date, evs?: Evento[])
  {
    this.data = dt;
    this.eventos = evs ? evs : [];
  }
}
