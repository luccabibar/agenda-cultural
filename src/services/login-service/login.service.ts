import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsuarioAutenticado } from '../../interfaces/usuario/usuairo-autenticado';
import { AgendaCulturalService } from '../agenda-cultural-service/agenda-cultural.service';
import { Resposta } from '../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { Usuario } from '../../interfaces/usuario/usuarios';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  private usuario: UsuarioAutenticado | null;
  private subject: Subject<UsuarioAutenticado | null>;

  private cookieKey: string = 'STOREDTOKEN';
  private storedToken: string | null

  constructor(
    private acService: AgendaCulturalService,
    private cookieService: CookieService
  ) {
    this.subject = new Subject<UsuarioAutenticado | null>();
    this.usuario = null; // source from sstorage

    // busca sessao anterior, tenta autenticar 
    this.storedToken = cookieService.check(this.cookieKey) ? cookieService.get(this.cookieKey) : null;
    
    // tenta restaurar sessao (verifica se token eh valida)
    if(this.storedToken){
      // usuario autenticado dummy
      let fauxUser =  UsuarioAutenticado.of({
        usuario: null,
        authToken: this.storedToken
      } as UsuarioAutenticado);

      acService.userDados(fauxUser).subscribe({
        next: this.authNext,
        error: this.authError
      });
    }
    // nova sessao
    else{
      console.log("Nao havia usuario logado");
      this.logout();
    }
  }
  
  
  authNext = (res: Resposta<Usuario>): void =>
  {
    if(!res.response){
      this.authError("Erro ao reaver sessao (token expirada?) " + res);
    }
    else{
      let user = UsuarioAutenticado.of({
        usuario: res.response,
        authToken: this.storedToken
      } as UsuarioAutenticado);

      this.login(user);
    }
  }
    
    
  authError = (res: HttpResponse<unknown> | string): void =>
  {
    if (res)
      console.log(res);

    // nova sessao
    this.logout();
  }


  getUsuario(): UsuarioAutenticado | null { return this.usuario; }
  getSubject(): Subject<UsuarioAutenticado | null> { return this.subject; }


  private setUsuario(user: UsuarioAutenticado | null)
  {
    // set nova sessao
    if(user && user.authToken)
      this.cookieService.set(
        this.cookieKey, // Key
        user.authToken, // Value
        86400000, // TTL (1 dia)
        undefined, // Path
        undefined, // Domain
        false,// Secure (SSL) (TODO: habilitar SSL)
        'Strict'// SameSite policy
      );
    //unset sessao
    else
      this.cookieService.delete(this.cookieKey);

    this.usuario = user;
    this.subject.next(this.usuario);
  }


  login(user: UsuarioAutenticado): boolean
  {
    if(this.usuario || !user || !user.isValid())
      return false;

    this.setUsuario(user);
    return true;
  }

  
  logout(): boolean
  {
    this.setUsuario(null);
    return true;
  }
}