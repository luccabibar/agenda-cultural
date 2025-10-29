import { Component, Input } from '@angular/core';
import { Evento } from '../../../../interfaces/evento';
import { NgForOf, SlicePipe, NgIf } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AgendaComponent } from '../agenda.component';
import { AgendaMode } from '../agendaMode';
import { BuscarDados } from '../../../../interfaces/buscar';
import { DatetimeUtil } from '../../../../utils/datetime';

@Component({
  selector: 'app-celula-agenda',
  standalone: true,
  imports: [NgForOf, SlicePipe, RouterLink, NgIf],
  templateUrl: './celula-agenda.component.html',
  styleUrl: './celula-agenda.component.scss'
})
export class CelulaAgendaComponent
{
  @Input("eventos") eventos: Evento[] = [];
  
  @Input("mostrarMais") mais: boolean = true;
  
  @Input("dataMostrarMais") data?: Date;

  @Input("maxSize") maxSize: number = 255;

  constructor(
    private router: Router
  ) {
    
  }

  navegaAgendaDiaria(): void
  {
    if(this.data){
      let filtros = new BuscarDados()
      
      filtros.diaLower = DatetimeUtil.dateToISODate(this.data); 
      filtros.diaUpper = DatetimeUtil.dateToISODate(this.data); 
      
      filtros.horaLower = DatetimeUtil.dateToISOTime(this.data); 
      
      if(this.data.getHours() < 23){
        let dataBuff = new Date(this.data);
        dataBuff.setHours(this.data.getHours() + 1);
      
        filtros.horaUpper = DatetimeUtil.dateToISOTime(dataBuff);
      }

      this.router.navigate(['/buscar'], { queryParams: filtros })
    } 
    else{
      console.log("CelulaAgendaComponent: filtros indefinidos ao mostrar mais");
      this.router.navigate(['/buscar'])
    }
  }
}
