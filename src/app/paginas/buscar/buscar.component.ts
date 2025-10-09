import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm }  from '@angular/forms';
import { Evento } from '../../../interfaces/evento';
import { BuscarDados, BuscarParams } from '../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { EventoCardComponent } from './evento-card/evento-card.component';
import { DatetimeUtil } from '../../../utils/datetime';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [ CommonModule, FormsModule, EventoCardComponent ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent 
{

  eventos: Evento[];
  buscarParams: BuscarParams;

  constructor(
    private acService: AgendaCulturalService
  ) {
    // inicializa objetos
    this.eventos = [];
    this.buscarParams = new BuscarParams();

    // recebe parametros
    
    // processa parametros

    // realiza requests necessarios
    acService.filtrosEventos().subscribe(
      (result) => {
        console.log(result);
        if(result.response)
          this.buscarParams = result.response;
      });
  }


  buscar(form: NgForm): void
  {
    if(form.invalid){
      return;
    } 

    let dados: BuscarDados = BuscarDados.of(form.value as BuscarDados);

    if(dados.horaLower) 
      dados.horaLower = DatetimeUtil.timeToISO(dados.horaLower); 

    if(dados.horaUpper) 
      dados.horaUpper = DatetimeUtil.timeToISO(dados.horaUpper);

    console.log(form.value, dados);
    

    this.acService.buscarEventos(dados).subscribe(
      (result) => {
        console.log(result);
        if(result.response)
          this.eventos = result.response;
      });
  }
}
