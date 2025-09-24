import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from './http-handler';

import { Configs } from './agenda-cultural-configs';

import { Evento } from '../../interfaces/evento';
import { map, Observable } from 'rxjs';
import { Resposta } from '../../interfaces/resposta';
import { BuscarDados, BuscarParams } from '../../interfaces/buscar';
import { LoginBody } from '../../interfaces/cadastro-login';
import { Usuario } from '../../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AgendaCulturalService extends HttpHandler
{
  private defaultHeaders: { [name: string]: string };

  constructor(http: HttpClient) 
  { 
    super(Configs.url, Configs.port, http)

    this.defaultHeaders = {
      'content-type': 'application/json'
    }
  }


  ping(): Observable<Resposta<string>>
  {
    let url: string = Configs.endpoints.ping();

    return this.httpGet<string>(url, { }, this.defaultHeaders)
      .pipe(map((res: Resposta<string>) => Resposta.of<string>(res)));
  }


  login(dados: LoginBody): Observable<Resposta<Usuario>>
  {
    let url: string = Configs.endpoints.login();
    
    return this.httpPost<Usuario>(url, dados, this.defaultHeaders)
      .pipe(map((res: Resposta<Usuario>) => Resposta.of<Usuario>(res, Usuario)));
  }


  getEvento(id: number): Observable<Resposta<Evento>>
  {
    let url: string = Configs.endpoints.evento(id);

    return this.httpGet<Evento>(url, { }, this.defaultHeaders)
      .pipe(map((res: Resposta<Evento>) => Resposta.of<Evento>(res, Evento)));
  }


  buscarEventos(dados: BuscarDados): Observable<Resposta<Evento[]>>
  {
    let url: string = Configs.endpoints.buscarEventos();  
    let params: { [key: string]: string | null } = {};
    
    let ddk: keyof BuscarDados;
    
    for (ddk in dados) 
      if(dados[ddk])
        params[ddk] = dados[ddk];  

    return this.httpGet<Evento[]>(url, params, this.defaultHeaders)
      .pipe(map((res: Resposta<Evento[]>) => Resposta.ofArray<Evento>(res, Evento)));
  }


  buscarParams(): Observable<Resposta<BuscarParams>>
  {
    let url: string = Configs.endpoints.getBuscarParams();  

    return this.httpGet<BuscarParams>(url, { }, this.defaultHeaders)
      .pipe(map((res: Resposta<BuscarParams>) => Resposta.of<BuscarParams>(res, BuscarParams)));
  }
}
