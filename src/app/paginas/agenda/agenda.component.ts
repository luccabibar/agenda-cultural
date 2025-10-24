import { Component } from '@angular/core';
import { AgendaSemanalComponent } from "./agenda-semanal/agenda-semanal.component";
import { AgendaDiariaComponent } from "./agenda-diaria/agenda-diaria.component";
import { NgIf } from "../../../../node_modules/@angular/common";
import { AgendaMode } from './agendaMode';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [AgendaSemanalComponent, AgendaDiariaComponent, NgIf],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent 
{
  currMode: AgendaMode;
  getAgendaMode = AgendaMode;
  
  
  constructor()
  {
    this.currMode = AgendaMode.SEMANAL;
  }


  public setCurrMode(value: AgendaMode) { this.currMode = value; }
}
