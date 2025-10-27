import { Component } from '@angular/core';
import { AgendaSemanalComponent } from "./agenda-semanal/agenda-semanal.component";
import { AgendaDiariaComponent } from "./agenda-diaria/agenda-diaria.component";
import { AgendaMode } from './agendaMode';
import { BuscarDados, BuscarParams } from '../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { NgForOf } from "../../../../node_modules/@angular/common/";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [AgendaSemanalComponent, AgendaDiariaComponent, NgForOf, FormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent 
{
  currMode: AgendaMode;
  getAgendaMode = AgendaMode;
  
  filtros: BuscarDados;
  dadosFiltros: BuscarParams;


  constructor(
    private acService: AgendaCulturalService
  ){
    this.currMode = AgendaMode.SEMANAL;

    this.filtros = new BuscarDados();
    this.dadosFiltros = new BuscarParams();

    acService.filtrosEventos().subscribe(
    (result) => {
      console.log(result);
      if(result.response)
        this.dadosFiltros = result.response;
    });
  }


  public setCurrMode(value: AgendaMode) { this.currMode = value; }
}
