import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';
import { Resposta } from '../interfaces/resposta';


export class HttpHandler {

  private address: string;

  constructor(
    url: string, 
    port: string, 
    private http: HttpClient
  ) {
    this.address = `http://${url}:${port}`
  }

  private getDefaultHeaders(): HttpHeaders
  {
    return new HttpHeaders()
      .set('content-type',  'aplication/json');
      // .set('Access-Control-Allow-Origin',  '*');
  }


  protected httpGet<T>(
    endpoint: string, 
    params?: { [key: string]: string | number | null }, 
    headers?: { [key: string]: string | null }
  ): Observable<Resposta<T>> 
  {
    let options = {
      params: new HttpParams(),
      headers: this.getDefaultHeaders(),
    };
    
    if(params){
      for(let pp in params){
        if(params[pp] != null){
          options.params = options.params.append(pp, params[pp]);
        }
      }
    }

    if(headers){
      for(let hh in headers){
        if(headers[hh] != null){
          options.headers = options.headers.append(hh, headers[hh]);
        }
      }
    }

    return this.http
      .get<Resposta<T>>(this.address + endpoint, options);
  }
}