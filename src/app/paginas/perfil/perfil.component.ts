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
import { Evento, StatusEvento } from '../../../interfaces/evento';
import { BuscarDados } from '../../../interfaces/buscar';
import { NgIf, CommonModule } from '@angular/common';
import { EventoCardComponent } from "../../../components/evento-card/evento-card.component";
import { EventosFilterPipe } from '../../../pipes/eventos-filter/eventos-filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgIf, EventoCardComponent, CommonModule, EventosFilterPipe, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent
{
  // userAuth: UsuarioAutenticado | null = null;
  userDados: Usuario | null = null;
  eventos: Evento[] = [];

  getTipoUsuario = TipoUsuario;
  getStatusEvento = StatusEvento;

  // Typescript eh uma linguagem de mentira
  orgDados: Organizador | null = null;
  modDados: Moderador | null = null;

  filtrosCurr: BuscarDados;

  filtrosJaAnalizados: BuscarDados;
  filtrosEmAnalise: BuscarDados;

  constructor(
    private loginService: LoginService,
    private acService: AgendaCulturalService,
    private router: Router,
  ) {
    this.filtrosCurr  = new BuscarDados();

    this.filtrosEmAnalise = new BuscarDados();
    this.filtrosEmAnalise.status = [StatusEvento.EMANALISE];

    this.filtrosJaAnalizados = new BuscarDados();
    this.filtrosJaAnalizados.status = [StatusEvento.APROVADO, StatusEvento.REPROVADO];
    
    // acessa usuario logado
    loginService
      .getSubject()
      .subscribe({
        next: (prm: Promise<UsuarioAutenticado | null>) => prm.then(this.loginServiceNext)
      })
      .unsubscribe();
  }


  loginServiceNext = (user: UsuarioAutenticado | null): void =>
  {
    if(user == null){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTH, '/perfil');
      return;
    }
    
    this.acService.userDados(user).subscribe({
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
      this.getModEventos();
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
    busca.status = [StatusEvento.APROVADO, StatusEvento.EMANALISE, StatusEvento.REPROVADO]

    this.acService.buscarEventos(busca).subscribe({
      next: this.eventosNext,
      error: this.eventosErr
    });
  }


  getModEventos(): void
  {
    if(
      !this.userDados 
      || !this.userDados.id
      || this.userDados.tipoUsuario != TipoUsuario.MODERADOR
    ){
      return;
    }

    let busca: BuscarDados = new BuscarDados();

    busca.moderador = this.userDados.id
    busca.status = [StatusEvento.APROVADO, StatusEvento.EMANALISE, StatusEvento.REPROVADO]

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


  editarEvento(id: number | null): void
  {
    if(id)
      this.router.navigate(['/evento', id, 'editar']);
    else
      console.error("PerfilComponent.editarEvento: id deste evento é null");
  }


  apagarEvento(id: number | null): void
  {
    if(id)
      this.router.navigate(['/evento', id, 'apagar']);
    else
      console.error("PerfilComponent.apagarEvento: id deste evento é null");
  }


  analisarEvento(id: number | null): void
  {
    if(id)
      this.router.navigate(['/evento', id, 'analisar']);
    else
      console.error("PerfilComponent.analisarEvento: id deste evento é null");
  }


  statusEventoTexto(status: StatusEvento | null): string
  {
    switch(status){
      case StatusEvento.APROVADO:
        return 'Aprovado';
        break;
      
      case StatusEvento.EMANALISE:
        return 'Em Análise';
        break;
      
      case StatusEvento.REPROVADO:
        return 'Reprovado';
        break;
      
      case StatusEvento.CANCELADO:
        return 'Cancelado';
        break;
      
      default:
        return 'Sem Status definido';
        break;
    }
  }
}
