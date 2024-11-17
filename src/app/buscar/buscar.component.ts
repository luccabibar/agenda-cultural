import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../services/agenda-cultural-service/agenda-cultural.service';
import { Evento } from '../../interfaces/evento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {

  eventos: Evento[];

  constructor(
    private acService: AgendaCulturalService
  ) {
    // inicializa objetos
    this.eventos = [];

    // recebe parametros
    
    // processa parametros

    // realiza requests necessarios
    acService.buscarEventos().subscribe(
    (result) => {
      console.log(result);
      this.eventos = result.response;
    });
  }

}
