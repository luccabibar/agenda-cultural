import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UsuarioAutenticado } from '../../interfaces/usuario/usuairo-autenticado';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  private usuario: UsuarioAutenticado | null;
  private subject: Subject<UsuarioAutenticado | null>;


  constructor()
  {
    this.subject = new Subject<UsuarioAutenticado | null>();
    this.usuario = null; // source from sstorage

    this.setUsuario(null);
  }

  getUsuario(): UsuarioAutenticado | null { return this.usuario; }
  getSubject(): Subject<UsuarioAutenticado | null> { return this.subject; }


  private setUsuario(user: UsuarioAutenticado | null)
  {
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
    if(!this.usuario)
      return false;

    this.setUsuario(null);
    return false;
  }
}
