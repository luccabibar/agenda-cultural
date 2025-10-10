import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login-service/login.service';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { NotfoundComponent } from '../notfound/notfound.component';
import { NotFoundMode } from '../notfound/notFoundMode';
import { Usuario } from '../../../interfaces/usuario/usuarios';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';
import { Evento } from '../../../interfaces/evento';
import { BuscarDados } from '../../../interfaces/buscar';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent
{
  userAuth: UsuarioAutenticado | null = null;
  userDados: Usuario | null = null;
  eventos: Evento[] = [];

  constructor(
    private loginService: LoginService,
    private acService: AgendaCulturalService,
    private router: Router,
  ) {
    this.userAuth = loginService.getUsuario();

    if(this.userAuth == null){
      NotfoundComponent.navegarParaNotFound(router, NotFoundMode.AUTH, '/perfil');
      return;
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

    if(this.userDados?.tipoUsuario == TipoUsuario.ORGANIZADOR)
      this.getUserEventos();
  }


  userDadosErr = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
    NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTH, '/perfil');
  }


  getUserEventos(): void
  {
    console.log("chego?????");
    
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
