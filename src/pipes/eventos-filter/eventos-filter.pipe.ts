import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from '../../interfaces/evento';
import { BuscarDados } from '../../interfaces/buscar';

@Pipe({
  name: 'eventosFilter',
  pure: false,
  standalone: true
})
export class EventosFilterPipe implements PipeTransform
{
  transform(eventos: Evento[], filtros: BuscarDados): Evento[]
  {
    let result: Evento[] = [];

    console.log(filtros);
    

    for(let ev of eventos){
      // TODO: Outros filtros

      // // se ev.nome ou ev.descricao nao contem fitlros.texto
      // if(filtros.texto      && !(ev.nome?.includes(filtros.texto) || ev.descricao?.includes(filtros.texto))) continue;
      if(filtros.categoria != null  && ev.categoria != filtros.categoria) continue;
      if(filtros.regiao != null     && ev.regiao != filtros.regiao)       continue;

      result.push(ev);
    }

    return result;
  }
}
