import { Component, Input } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { BuscarDados, BuscarParams } from '../../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { DatetimeUtil } from '../../../../utils/datetime';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { CelulaAgendaComponent } from "../celula-agenda/celula-agenda.component";
import { EventosFilterPipe } from '../../../../pipes/eventos-filter/eventos-filter.pipe';
import { CommonModule } from '@angular/common';
import { EventosCell } from '../EventosCell';

@Component({
  selector: 'app-agenda-diaria',
  standalone: true,
  imports: [CelulaAgendaComponent, EventosFilterPipe, CommonModule],
  templateUrl: './agenda-diaria.component.html',
  styleUrl: './agenda-diaria.component.scss'
})
export class AgendaDiariaComponent
{
  horarios: number[];
  eventos: Map<number, EventosCell>;

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

    this.horarios = [ ...Array(24).keys() ]; // 0, 1, ..., 23
    this.eventos = new Map<number, EventosCell>();

    this.data = new Date();
    this.dataNext();

    
  }

  dataNext(): void
  {
    let params = new BuscarDados();
    let dateBuff: Date = new Date(this.data); 
    
    dateBuff.setHours(0, 0, 0, 0);
    params.diaLower = DatetimeUtil.dateToISODate(dateBuff); 
    params.diaUpper = DatetimeUtil.dateToISODate(dateBuff);

    console.log("dateNext:", params);   

    // BUSCA EVENTOS
    this.acService.buscarEventos(params).subscribe({
      next: this.eventosNext,
      error: this.eventosError 
    });
  }


  eventosNext = (res: Resposta<Evento[]>): void => 
  {
    if(res.response){
      // this.eventos = res.response;
      this.eventos = this.formatEventos(res.response);
      // this.setScroll();
    }
    else{
      console.log(":(((");
    }

    console.log("eventos diarios: ", this.eventos);
  }


  eventosError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
  }


  formatEventos(eventos: Evento[]): Map<number, EventosCell>
  {
    let newEventos = new Map<number, EventosCell>();

    for(let ev of eventos){
      let evHora = DatetimeUtil.toDate(ev.horarioInicio as string);
      
      // data invalida
      if(!evHora || isNaN(evHora as unknown as number)){
        console.log("formatEventos:  data invalida no evento", ev);
        continue;
      }

      evHora.setMinutes(0, 0, 0);

      if(newEventos.has(evHora.getHours())){
        newEventos.get(evHora.getHours())?.eventos.push(ev);
      }
      else{
        let xx, yy;
        [xx, yy] = this.getGridPostition(evHora);
        
        newEventos.set(evHora.getHours(), new EventosCell([ev], xx, yy, evHora));
      }      
    }

    return newEventos;
  }


  getGridPostition(data: Date): [number, number]
  {
    let hora: number = data.getHours();

    // linha: AM ou PM
    let xx: number = hora < 12 ? 2 : 4;

    // coluna: hora no relogio
    let yy: number = (hora % 12) + 1;
       
    return [xx, yy];
  }


  styleGridPlacement(xx: number, yy: number): { 'grid-row': string, 'grid-column': string }
  {
    return { 
      'grid-row': xx + ' / span 1', 
      'grid-column': yy  + ' / span 1'
    }
  }
}
