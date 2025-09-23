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


  protected httpGet<T>(
    endpoint: string, 
    params?: { [key: string]: string | number | null }, 
    headers?: { [name: string]: string } | null
  ): Observable<Resposta<T>> 
  {
    let options: { headers?: HttpHeaders, params?: HttpParams } = { };

    if(params){
      options.params = new HttpParams()

      for(let pp in params)
        if(params[pp] != null)
          options.params = options.params.set(pp, params[pp])
    }

    console.log(params, options.params?.keys());
    

    if(headers)
      options.headers = new HttpHeaders(headers);

    return this.http
      .get<Resposta<T>>(this.address + endpoint, options);
  }


  protected httpPost<T>(
    endpoint: string, 
    dados?: any, //{ [key: string]: string | number | null }, 
    headers?: { [name: string]: string }
  ): Observable<Resposta<T>> 
  {
    let options: { headers?: HttpHeaders } = { };
    
    let body: string | null = dados ? JSON.stringify(dados) : null;

    if(headers)
      options.headers = new HttpHeaders(headers);

    console.log(body);

    return this.http
      .post<Resposta<T>>(this.address + endpoint, body, options);
  }
}