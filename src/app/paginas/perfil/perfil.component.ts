import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login-service/login.service';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { NotfoundComponent } from '../notfound/notfound.component';
import { NotFoundMode } from '../notfound/notFoundMode';
import { Usuario, Organizador,  Moderador } from '../../../interfaces/usuario/usuarios';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';
import { Evento } from '../../../interfaces/evento';
import { BuscarDados } from '../../../interfaces/buscar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgIf],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent
{
  userAuth: UsuarioAutenticado | null = null;
  userDados: Usuario | null = null;
  eventos: Evento[] = [];

  // Typescript eh uma linguagem de mentira
  orgDados: Organizador | null = null;
  modDados: Moderador | null = null;

  constructor(
    private loginService: LoginService,
    private acService: AgendaCulturalService,
    private router: Router,
  ) {
    this.userAuth = loginService.getUsuario();

    if(this.userAuth == null){
      // NotfoundComponent.navegarParaNotFound(router, NotFoundMode.AUTH, '/perfil');
      // return;
      
      this.userAuth =  UsuarioAutenticado.of({
        "usuario": {
          "id": 1,
          "email": "luccabibar@gmail.com",
          "nome": "bibar",
          "cpf": null,
          "tipoUsuario": "ORGANIZADOR"
        },
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJPUkdBTklaQURPUiIsImlhdCI6MTc2MDE0MTQ3MywiZXhwIjoxNzYwMjI3ODczfQ.nAtALm_rG43tUX4bBXiC5qs06xwXij3BdYgdTR3yMd8"
      } as unknown as UsuarioAutenticado)
    }
    
    acService.userDados(this.userAuth).subscribe({
      next: this.userDadosNext,
      error: this.userDadosErr
    });
  }


  userDadosNext = (res: Resposta<Usuario>): void =>
  {
    console.log(res);
    this.userDados = res.response;

    if(this.userDados?.tipoUsuario == TipoUsuario.ORGANIZADOR){
      this.orgDados = this.userDados as Organizador;
      this.getOrgEventos();
    }
    else if(this.userDados?.tipoUsuario == TipoUsuario.MODERADOR){
      this.orgDados = this.userDados as Moderador;
    }
  }


  userDadosErr = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
    NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTH, '/perfil');
  }


  getOrgEventos(): void
  {
    if(
      !this.userDados 
      || !this.userDados.id
      || this.userDados.tipoUsuario != TipoUsuario.ORGANIZADOR
    ){
      return;
    }

    let busca: BuscarDados = new BuscarDados();
    busca.organizador = this.userDados.id

    this.acService.buscarEventos(busca).subscribe({
      next: this.eventosNext,
      error: this.eventosErr
    });
  }


  eventosNext = (res: Resposta<Evento[]>): void =>
  {
    console.log(res);

    if(res.response)
      this.eventos = res.response;
  }


  eventosErr = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
    // NotfoundComponent.navegarParaNotFound(router, NotFoundMode.AUTH, '/perfil');
  }
}
