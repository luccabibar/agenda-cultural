import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Resposta } from '../../interfaces/resposta';


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
    params?: { [key: string]: string | number | boolean | (string | number | boolean)[]}, 
    headers?: { [name: string]: string } | null
  ): Observable<Resposta<T>> 
  {
    let options: { headers?: HttpHeaders, params?: HttpParams } = { };

    if(params)
      options.params = new HttpParams().appendAll(params);

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

    console.log(endpoint, body);

    return this.http
      .post<Resposta<T>>(this.address + endpoint, body, options);
  }


  protected httpPatch<T>(
    endpoint: string, 
    dados?: any, //{ [key: string]: string | number | null }, 
    headers?: { [name: string]: string }
  ): Observable<Resposta<T>> 
  {
    let options: { headers?: HttpHeaders } = { };
    
    let body: string | null = dados ? JSON.stringify(dados) : null;

    if(headers)
      options.headers = new HttpHeaders(headers);

    console.log(endpoint, body);

    return this.http
      .patch<Resposta<T>>(this.address + endpoint, body, options);
    
  }


  protected httpDelete<T>(
    endpoint: string, 
    headers?: { [name: string]: string }
  ): Observable<Resposta<T>> 
  {
    let options: { headers?: HttpHeaders } = { };

    if(headers)
      options.headers = new HttpHeaders(headers);

    console.log(endpoint);

    return this.http
      .patch<Resposta<T>>(this.address + endpoint, options);
    
  }
}