import { Evento } from "../../../interfaces/evento";

// solucao bunda para um problema bunda
// contador de problemas que nao existiriam numa linguagem de verdade: +1
export class EventosCell
{
  eventos: Evento[];

  xx: number;
  yy: number;

  data?: Date;

  constructor(evs: Evento[] = [], xi: number = -1, yi: number = -1, dt?: Date)
  {
    this.eventos = evs;
    this.xx = xi;
    this.yy = yi;
    this.data = dt;
  }
}