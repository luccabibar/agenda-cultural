import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '../http-handler';

import { Configs } from './agenda-cultural-configs';

import { Evento } from '../../interfaces/evento';
import { Observable } from 'rxjs';
import { Resposta } from '../../interfaces/resposta';
import { BuscarDados, BuscarParams } from '../../interfaces/buscar';

@Injectable({
  providedIn: 'root'
})
export class AgendaCulturalService extends HttpHandler {

  constructor(http: HttpClient) 
  { 
    super(Configs.url, Configs.port, http)
  }


  ping(): Observable<unknown>
  {
    return this.httpGet<unknown>(Configs.endpoints.ping);
  }


  getEvento(id: number): Observable<Resposta<Evento>>
  {
    return this.httpGet<Resposta<Evento>>(
      Configs.endpoints.evento, 
      { 'id': id }, 
      { }
    );
  }


  buscarEventos(dados: BuscarDados): Observable<Resposta<Evento[]>> {
      
    let params: { [key: string]: string | null } = {};
    
    let ddk: keyof BuscarDados;
    for (ddk in dados) {
      if(dados[ddk]){
        console.log(dados[ddk]);
        params[ddk] = dados[ddk];
      }
    }

    return this.httpGet<Resposta<Evento[]>>(
      Configs.endpoints.buscarEventos, 
      params, 
      { }
    );
  }

  buscarParams(): Observable<Resposta<BuscarParams>>
  {
    return this.httpGet<Resposta<BuscarParams>>(Configs.endpoints.getBuscarParams);
  }
}
