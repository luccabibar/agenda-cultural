import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm }  from '@angular/forms';
import { Evento, StatusEvento } from '../../../interfaces/evento';
import { BuscarDados, BuscarParams } from '../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { DatetimeUtil } from '../../../utils/datetime';
import { EventoCardComponent } from '../../../components/evento-card/evento-card.component';
import { Resposta } from '../../../interfaces/resposta';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento-buscar',
  standalone: true,
  imports: [ CommonModule, FormsModule, EventoCardComponent ],
  templateUrl: './evento-buscar.component.html',
  styleUrl: './evento-buscar.component.scss'
})
export class EventoBuscarComponent 
{

  eventos: Evento[];
  buscarParams: BuscarParams;

  constructor(
    private acService: AgendaCulturalService,
    private activeRoute: ActivatedRoute
  ) {
    // inicializa objetos
    this.eventos = [];
    this.buscarParams = new BuscarParams();

    // recebe parametros
    
    // processa parametros

    // realiza requests necessarios
    acService.filtrosEventos().subscribe(this.filtrosNext);
  }


  filtrosNext = (result: Resposta<BuscarParams>): void =>
  {
    console.log(result);

    if(result.response){
      this.buscarParams = result.response;

      // deve ser feito APOS filtros
      this.buscarQueryParams();
    }
    else{
      console.log(":((");
    }
  }


  buscarQueryParams(): void
  {
    let routeParams = this.activeRoute.snapshot.queryParams;
    let dados = BuscarDados.of(routeParams as BuscarDados)

    console.log(dados);

    if(dados.isEmpty())
      return;
    else
      this.buscar(dados);
  }


  buscarForm(form: NgForm): void
  {
    if(form.invalid){
      return;
    } 

    let dados: BuscarDados = BuscarDados.of(form.value as BuscarDados);

    if(dados.horaLower) 
      dados.horaLower = DatetimeUtil.timeToISO(dados.horaLower); 

    if(dados.horaUpper) 
      dados.horaUpper = DatetimeUtil.timeToISO(dados.horaUpper);

    this.buscar(dados);
  }


  buscar(dados: BuscarDados)
  {
    dados.status = [StatusEvento.APROVADO];

    this.acService.buscarEventos(dados).subscribe(
    (result) => {
      console.log(result);
      if(result.response)
        this.eventos = result.response;
    });
  }
}
