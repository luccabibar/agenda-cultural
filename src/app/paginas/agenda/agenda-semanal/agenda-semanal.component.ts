import { Component } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { BuscarDados  } from '../../../../interfaces/buscar';
import { DatetimeUtil } from '../../../../utils/datetime';
import { CommonModule } from '@angular/common';
import { NgForOf } from "../../../../../node_modules/@angular/common";

@Component({
  selector: 'app-agenda-semanal',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './agenda-semanal.component.html',
  styleUrl: './agenda-semanal.component.scss'
})
export class AgendaSemanalComponent
{
  eventos: Evento[];

  hoje: Date;

  horarios: number[];

  dias: Date[];

  diasMirrKey: (dt: Date) => string;
  diasMirr: Map<string, number>;

  gridLinOffset: number = 2;
  gridColOffset: number = 2;


  constructor(
    private acService: AgendaCulturalService
  ) {
    this.eventos = [];

    this.hoje = new Date(Date.now());
    this.hoje.setHours(0, 0, 0, 0);

    // HORARIOS
    this.horarios = [...Array(24).keys()]; // 0, 1, ..., 23

    // DIAS
    let [domingoAnt, domingoProx] = this.getDomingos(this.hoje); 
    
    let params = this.getParamsEvento(domingoAnt, domingoProx);
    
    // vetor de dias
    this.dias = this.getDias(domingoAnt, domingoProx);

    if(this.dias.length != 8)
      console.log("WARNING: AgendaSemanalComponent.constructor: dias.lenght nao corresponde a grade", this.dias);
    
    // mirror pro vetor
    this.diasMirrKey = (dt: Date): string => { return DatetimeUtil.dateToISODate(dt); }
    this.diasMirr = this.getDiasMirr(this.dias, this.diasMirrKey);
      

    // BUSCA EVENTOS
    acService.buscarEventos(params).subscribe({
      next: this.eventosNext,
      error: this.eventosError 
    })
  }


  eventosNext = (res: Resposta<Evento[]>):void => 
  {
    if(res.response)
     this.eventos = res.response;
    else
      console.log(":(((");

    console.log(this.eventos);
    
  }


  eventosError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
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


  getDias(ini: Date, fim: Date, incluirUltimo: boolean = true): Date[]
  {
    let dias: Date[] = []

    if(incluirUltimo)
      // itera de um dia ao proximo
      for(let dd = new Date(ini); dd <= fim; dd.setDate(dd.getDate() + 1))
        dias.push(new Date(dd));
  
    else
      // itera de um dia ao proximo
      for(let dd = new Date(ini); dd < fim; dd.setDate(dd.getDate() + 1))
        dias.push(new Date(dd));
    
    return dias;
  }

  getDiasMirr(dias: Date[], keyFn: (dt: Date) => string): Map<string, number>
  {
    let said = new Map<string, number>();
    
    dias.forEach((xx: Date, ii: number) => 
      said.set(keyFn(xx), ii)
    );

    return said;
  }


  getParamsEvento(domingoAnterior: Date, domingoProximo: Date): BuscarDados
  {
    let params = new BuscarDados();

    params.diaLower = DatetimeUtil.dateToISODate(domingoAnterior); 
    params.diaUpper = DatetimeUtil.dateToISODate(domingoProximo); 

    return params;
  }


  getGridPostition(ev: Evento): [number, number]
  {
    console.log("que");    

    let evData: Date | null =  DatetimeUtil.toDate(ev.horarioInicio as string);
    
    console.log("qua", evData);
    
    if(!evData || isNaN(evData as unknown as number))
      return [-1, -1];

    // linha: horario
    let xx: number = evData.getHours() + this.gridLinOffset

    // coluna: data
    let yy: number = this.diasMirr.has(this.diasMirrKey(evData)) ? 
      (this.diasMirr.get(this.diasMirrKey(evData)) as number + this.gridColOffset) 
      : -1;
    
    return [xx, yy];
  }


  styleGridPlacement([xx, yy]: [number, number]): { 'grid-row': string, 'grid-column': string }
  {
    return { 
      'grid-row': xx + ' / span 1', 
      'grid-column': yy  + ' / span 1'
    }
  }
}