import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from './http-handler';

import { Configs } from './agenda-cultural-configs';

import { Evento } from '../../interfaces/evento';
import { map, Observable } from 'rxjs';
import { Resposta } from '../../interfaces/resposta';
import { BuscarDados, BuscarParams } from '../../interfaces/buscar';
import { CadastroOrganizadorBody, CadastroPessoaBody, LoginBody } from '../../interfaces/cadastro-login';
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


  cadastrarOrganizador(dados: CadastroOrganizadorBody): Observable<Resposta<boolean>>
  {
    let url: string = Configs.endpoints.organizador();
    
    return this.httpPost<boolean>(url, dados, this.defaultHeaders)
      .pipe(map((res: Resposta<boolean>) => Resposta.of<boolean>(res)));
  }


  cadastrarPessoa(dados: CadastroPessoaBody): Observable<Resposta<boolean>>
  {
    let url: string = Configs.endpoints.pessoa();
    
    return this.httpPost<boolean>(url, dados, this.defaultHeaders)
      .pipe(map((res: Resposta<boolean>) => Resposta.of<boolean>(res)));
  }


  getEvento(id: number): Observable<Resposta<Evento>>
  {
    let url: string = Configs.endpoints.eventoById(id);

    return this.httpGet<Evento>(url, { }, this.defaultHeaders)
      .pipe(map((res: Resposta<Evento>) => Resposta.of<Evento>(res, Evento)));
  }


  buscarEventos(dados: BuscarDados): Observable<Resposta<Evento[]>>
  {
    let url: string = Configs.endpoints.eventos();  
    let params: { [key: string]: string | null } = {};
    
    let ddk: keyof BuscarDados;
    
    for (ddk in dados) 
      if(dados[ddk])
        params[ddk] = dados[ddk];  

    return this.httpGet<Evento[]>(url, params, this.defaultHeaders)
      .pipe(map((res: Resposta<Evento[]>) => Resposta.ofArray<Evento>(res, Evento)));
  }


  filtrosEventos(): Observable<Resposta<BuscarParams>>
  {
    let url: string = Configs.endpoints.eventosFiltros();  

    return this.httpGet<BuscarParams>(url, { }, this.defaultHeaders)
      .pipe(map((res: Resposta<BuscarParams>) => Resposta.of<BuscarParams>(res, BuscarParams)));
  }
}
