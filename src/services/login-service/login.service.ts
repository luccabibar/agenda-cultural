import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private subject: BehaviorSubject<Promise<UsuarioAutenticado | null>>;
  private cookieKey: string = 'STOREDTOKEN';

  constructor(
    private acService: AgendaCulturalService,
    private cookieService: CookieService
  ) {
    // busca token em cookie
    let storedToken: string | null = this.cookieService.check(this.cookieKey) ? this.cookieService.get(this.cookieKey) : null;

    // se ja tem o token, tenta criar promise a partir dele
    if(storedToken){
      this.subject = new BehaviorSubject<Promise<UsuarioAutenticado | null>>(
        this.promiseFromToken(storedToken)
      );
    }
    // senao, cria promise a partir de um null
    else {
      this.subject = new BehaviorSubject<Promise<UsuarioAutenticado | null>>(
        this.promiseFromValue(null)
      );
    }    

    // atualiza cookies depois de qualquer update no subject
    this.subject.subscribe((prm: Promise<UsuarioAutenticado | null>): void => {
      prm.then(this.updateCookie, console.log);
    });
  }


  promiseFromToken(token: string): Promise<UsuarioAutenticado | null>
  {
    // prepara suario autenticado dummy
    let fauxUser =  UsuarioAutenticado.of({
      usuario: null,
      authToken: token
    } as UsuarioAutenticado);

    // constroi promisse
    return new Promise<UsuarioAutenticado | null>((resolve, reject) =>
    {
      // next: recebe usuario; resolve ele
      let authNext = (res: Resposta<Usuario>): void =>
      {
        // se deu errado
        if(!res.response){
          this.resolvePromise(null, resolve);
        }
        // se deu bom
        else{

          // novo objeto UsuarioAutenticado
          let user = UsuarioAutenticado.of({
            usuario: res.response,
            authToken: token
          } as UsuarioAutenticado);

          // loga o usuario
          this.resolvePromise(user, resolve);
        }
      }


      // error: recebe error, resolve um null
      let authError = (res: HttpResponse<unknown>): void =>
      {
        if (res)
          console.log(res);

        // nova sessao
        this.resolvePromise(null, resolve);
      }


      // realiza tentativa de autenticacao
      this.acService.userDados(fauxUser).subscribe({
        next: authNext,
        error: authError
      });
    });
  }



  promiseFromValue(user: UsuarioAutenticado | null)
  {
    return new Promise<UsuarioAutenticado | null>((resolve, reject) =>
    {
      this.resolvePromise(user, resolve);
    });
  }


  resolvePromise(
    user: UsuarioAutenticado | null, 
    resolve: (value: UsuarioAutenticado | null | PromiseLike<UsuarioAutenticado | null>) => void
  ): void
  {
    // resolve promisse
    resolve(user);
  }


  public getSubject(): BehaviorSubject<Promise<UsuarioAutenticado | null>> { return this.subject; }


  public login(user: UsuarioAutenticado): boolean
  {
    if(!UsuarioAutenticado.isValid(user))
      return false;

    this.subject.next(
      this.promiseFromValue(user)
    );

    return true;
  }

  
  public logout(): boolean
  {
    this.subject.next(
      this.promiseFromValue(null)
    );

    return true;
  }


  updateCookie = (user: UsuarioAutenticado | null): void =>
  {
    if(UsuarioAutenticado.isValid(user)){
      let newToken: string = (user as UsuarioAutenticado).authToken as string // coinfia 

      this.cookieService.set(
        this.cookieKey, // Key
        newToken, // Value
        86400000, // TTL (1 dia)
        '/', // Path
        undefined, // Domain
        false,// Secure (SSL) (TODO: habilitar SSL)
        'Strict'// SameSite policy
      );
    }
    else{
      this.cookieService.delete(this.cookieKey);
    }
  }
}