import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { BuscarDados  } from '../../../../interfaces/buscar';
import { DatetimeUtil } from '../../../../utils/datetime';
import { CommonModule } from '@angular/common';
import { NgForOf } from "../../../../../node_modules/@angular/common";
import { CelulaAgendaComponent } from "../celula-agenda/celula-agenda.component";
import { Router, RouterLink } from "@angular/router";
import { AgendaMode } from '../agendaMode';
import { EventosFilterPipe } from '../../../../pipes/eventos-filter/eventos-filter.pipe';
import { AgendaComponent } from '../agenda.component';

@Component({
  selector: 'app-agenda-semanal',
  standalone: true,
  imports: [NgForOf, CommonModule, CelulaAgendaComponent, EventosFilterPipe],
  templateUrl: './agenda-semanal.component.html',
  styleUrl: './agenda-semanal.component.scss'
})
export class AgendaSemanalComponent
{
  // @ViewChild('scroll') private container!: ElementRef;

  eventosKey: ([xx, yy]: [number, number]) => string;
  eventos: Map<string, EventosCell>;

  @Input("filtros") filtros: BuscarDados;

  hoje: Date;

  horarios: number[];

  dias: Date[];

  diasMirrKey: (dt: Date) => string;
  diasMirr: Map<string, number>;

  gridLinOffset: number = 2;
  gridColOffset: number = 2;


  constructor(
    private acService: AgendaCulturalService,
    private router: Router
  ) {

    this.eventosKey = ([xx, yy]: [number, number]) => xx + '-' + yy
    this.eventos = new Map<string, EventosCell>()

    this.hoje = new Date(Date.now());
    this.hoje.setHours(0, 0, 0, 0);

    // filtros
    this.filtros = new BuscarDados();

    // HORARIOS
    this.horarios = [ ...Array(24).keys() ]; // 0, 1, ..., 23

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


  eventosNext = (res: Resposta<Evento[]>): void => 
  {
    if(res.response){
      this.eventos = this.formatEventos(res.response, this.eventosKey);
      // this.setScroll();
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


  // setScroll(/* vv: number */): void
  // {
  //   if(this.container){
  //     try {
  //       console.log("bunda");
  //       this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
        
  //     } 
  //     catch(err) { 
  //       console.log(err);        
  //     } 
  //   }
  //   else{
  //       console.log("desbunda");
  //   }
  // }


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


  formatEventos(
    eventos: Evento[], 
    mapKey: ([xx, yy]: [number, number]) => string
  ): Map<string, EventosCell> {

    let mapa = new Map<string, EventosCell>();

    for(let ev of eventos){
      
      let evData: Date | null =  DatetimeUtil.toDate(ev.horarioInicio as string);
    
      if(!evData || isNaN(evData as unknown as number)){
        console.log("formatEventos:  data invalida no evento", ev);
        continue;
      }

      let xx, yy;
      [xx, yy] = this.getGridPostition(evData);

      let key = mapKey([xx, yy]);

      if(mapa.has(key))
        (mapa.get(key) as EventosCell).eventos.push(ev);
      
      else
        mapa.set(key, new EventosCell([ev], xx, yy, evData));
    }

    console.log(mapa);
    
    return mapa;
  }


  getParamsEvento(domingoAnterior: Date, domingoProximo: Date): BuscarDados
  {
    let params = new BuscarDados();

    params.diaLower = DatetimeUtil.dateToISODate(domingoAnterior); 
    params.diaUpper = DatetimeUtil.dateToISODate(domingoProximo); 

    return params;
  }


  getGridPostition(data: Date): [number, number]
  {
    // linha: horario
    let xx: number = data.getHours() + this.gridLinOffset

    // coluna: data
    let yy: number = this.diasMirr.has(this.diasMirrKey(data)) ? 
      (this.diasMirr.get(this.diasMirrKey(data)) as number + this.gridColOffset) 
      : -1;
    
    return [xx, yy];
  }


  styleGridPlacement(xx: number, yy: number): { 'grid-row': string, 'grid-column': string }
  {
    return { 
      'grid-row': xx + ' / span 1', 
      'grid-column': yy  + ' / span 1'
    }
  }

  navegarAgendaDiaria(dd?: Date)
  {
    AgendaComponent.navegarParaAgenda(this.router, AgendaMode.DIARIA, dd);
  }
}


// solucao bunda para um problema bunda
// contador de problemas que nao existiriam numa linguagem de verdade: +1
export class EventosCell
{
  eventos: Evento[];

  xx: number;
  yy: number;

  data?: Date;

  constructor(evs: Evento[] = [], xi: number = -1, yi: number = -1, dt?: Date)
  {
    this.eventos = evs;
    this.xx = xi;
    this.yy = yi;
    this.data = dt;
  }
}