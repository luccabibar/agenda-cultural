import { Component, Input } from '@angular/core';
import { Evento } from '../../../../../interfaces/evento';
import { NgForOf, SlicePipe, NgIf } from "../../../../../../node_modules/@angular/common/";
import { RouterLink } from "@angular/router";

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

  @Input("maxSize") maxSize: number = 255;

  mock: string[];

  constructor()
  {
    this.mock = [
      "AAAAAAAAA CCCCC BBBBBBBB",
      "AAAAAAAA BBBBBBBB CCCCCC",
      "AAAAAAAAAA BBBBBBBBBB CC",
      "AAAAAAAAA BBBBBBBB CCCCC",
      "AAAAAAAA BBBBBBBB CCCCCC",
      "AAAAAAAA BBBBBBBB CCCCCC",
    ];
  }
}
