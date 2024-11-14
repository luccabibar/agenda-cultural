import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from './http-handler';

import { Configs } from './agenda-cultural-configs';

import { Evento } from '../../interfaces/evento';
import { Observable } from 'rxjs';
import {Resposta } from '../../interfaces/resposta';

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
      {}
    );
  }
}
