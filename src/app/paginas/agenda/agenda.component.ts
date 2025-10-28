import { Component } from '@angular/core';
import { AgendaSemanalComponent } from "./agenda-semanal/agenda-semanal.component";
import { AgendaDiariaComponent } from "./agenda-diaria/agenda-diaria.component";
import { AgendaMode } from './agendaMode';
import { BuscarDados, BuscarParams } from '../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { NgForOf } from "../../../../node_modules/@angular/common/";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatetimeUtil } from '../../../utils/datetime';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [AgendaSemanalComponent, AgendaDiariaComponent, NgForOf, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent 
{
  getAgendaMode = AgendaMode;
  currMode: AgendaMode;

  paramDate: Date | null;
  
  filtros: BuscarDados;
  dadosFiltros: BuscarParams;

  constructor(
    private acService: AgendaCulturalService,
    private activeRoute: ActivatedRoute
  ){
    this.paramDate = null;
    this.currMode = AgendaMode.SEMANAL;

    this.filtros = new BuscarDados();
    this.dadosFiltros = new BuscarParams();

    // verifica se a pagina deve carregar algum dia/modo especifico
    activeRoute.queryParams.subscribe(this.queryParamsNext);

    // filtros para os eventos
    acService.filtrosEventos().subscribe(
    (result) => {
      console.log(result);
      if(result.response)
        this.dadosFiltros = result.response;
    });
  }


  queryParamsNext = (params: Params): void => 
  {      
    console.log("query params next", params);

    // modo
    if('mode' in params){
      let pMode: AgendaMode | null = AgendaMode.parse(params['mode']);
      
      if(pMode)
        this.currMode = pMode;
    }
    
    // data
    if('data' in params){
      let pDateStr: string | null = params['data'];
      
      if(pDateStr && DatetimeUtil.isDateValid(pDateStr)){
        let pDate = DatetimeUtil.toDate(pDateStr); 

        if(pDate)
          this.paramDate = pDate;
      }
    }
  }


  public setCurrMode(value: AgendaMode) { this.currMode = value; }


  public static navegarParaAgenda(
    router: Router,
    mode?: AgendaMode,
    dia?: Date | string
  ) {
    let agendaParams: { 'mode'?: AgendaMode, 'data'?: string }  = {};

    if(mode) agendaParams.mode = mode;

    if(dia) 
      if(typeof dia === 'string')   agendaParams.data = dia;
      else if(dia instanceof Date)  agendaParams.data = DatetimeUtil.dateToISODate(dia);
      
    router.navigate(['/agenda'], { queryParams: agendaParams });
  }
}
