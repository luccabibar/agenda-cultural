import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm }  from '@angular/forms';
import { Evento } from '../../../interfaces/evento';
import { BuscarDados, BuscarParams } from '../../../interfaces/buscar';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {

  eventos: Evento[];
  buscarParams: BuscarParams;
  buscarDados: BuscarDados;

  constructor(
    private acService: AgendaCulturalService
  ) {
    // inicializa objetos
    this.eventos = [];
    this.buscarParams = { 'categorias': [], 'regioes': [] };
    this.buscarDados = {
      'texto': '',
      'regiao': null,
      'categoria': null,
      'diaUpper': '',
      'diaLower': '',
      'horaUpper': '',
      'horaLower': ''
    }

    // recebe parametros
    
    // processa parametros

    // realiza requests necessarios
    acService.buscarParams().subscribe(
      (result) => {
        console.log(result);
        this.buscarParams = result.response;
      });
  }


  buscar(form: NgForm): void
  {
    if(form.invalid){
      return;
    } 

    this.acService.buscarEventos(this.buscarDados).subscribe(
      (result) => {
        console.log(result);
        this.eventos = result.response;
      });
  }
}
