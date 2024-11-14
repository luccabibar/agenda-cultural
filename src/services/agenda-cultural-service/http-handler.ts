import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';


export class HttpHandler {

  private address: String;

  constructor(
    url: String, 
    port: String, 
    private http: HttpClient
  ) {
    this.address = `http://${url}:${port}/`
  }

  private getDefaultHeaders(): HttpHeaders
  {
    return new HttpHeaders()
      .set('content-type',  'aplication/json')
      .set('Access-Control-Allow-Origin',  '*');
  }


  protected httpGet<T>(
    endpoint: string, 
    params?: { [key: string]: string | number }, 
    headers?: { [key: string]: string },
  ): Observable<T> 
  {
    let options = {
      params: new HttpParams(),
      headers: this.getDefaultHeaders(),
    };
    
    if(params){
      for(let k in params){
        options.params = options.params.append(k, params[k]);
      }
    }

    if(headers){
      for(let k in headers){
        options.headers = options.headers.append(k, headers[k]);
      }
    }

    return this.http.get<T>(this.address + endpoint, options);
  }
}