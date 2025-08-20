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


  ping(): Observable<Resposta<string>>
  {
    let url: string = Configs.endpoints.ping();

    return this.httpGet<Resposta<string>>(url);
  }


  getEvento(id: number): Observable<Resposta<Evento>>
  {
    let url: string = Configs.endpoints.evento(id);

    return this.httpGet<Resposta<Evento>>(url);
  }


  buscarEventos(dados: BuscarDados): Observable<Resposta<Evento[]>>
  {
    let url: string = Configs.endpoints.buscarEventos();  
    let params: { [key: string]: string | null } = {};
    
    let ddk: keyof BuscarDados;
    for (ddk in dados) {
      if(dados[ddk]){
        console.log(dados[ddk]);
        params[ddk] = dados[ddk];
      }
    }

    return this.httpGet<Resposta<Evento[]>>(
      url, 
      params, 
      { }
    );
  }

  buscarParams(): Observable<Resposta<BuscarParams>>
  {
    let url: string = Configs.endpoints.getBuscarParams();  

    return this.httpGet<Resposta<BuscarParams>>(url);
  }
}
