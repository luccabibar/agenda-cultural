import { Injectable } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{
  private usuario: Usuario | null;
  private subject: Subject<Usuario | null>;


  constructor()
  {
    console.log("UsuarioService: inicializado usando null");
    

    this.subject = new Subject<Usuario | null>();
    this.usuario = null; // source from sstorage

    this.setUsuario(null);
  }

  getUsuario(): Usuario | null { return this.usuario; }
  getSubject(): Subject<Usuario | null> { return this.subject; }


  private setUsuario(user: Usuario | null)
  {
    this.usuario = user;
    this.subject.next(this.usuario);
  }


  login(user: Usuario): boolean
  {
    if(this.usuario || !user)
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
