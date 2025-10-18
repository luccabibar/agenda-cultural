import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../../../interfaces/evento';
import { NotfoundComponent } from '../notfound/notfound.component';
import { NotFoundMode } from '../notfound/notFoundMode';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { LoginService } from '../../../services/login-service/login.service';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from "../../../../node_modules/@angular/common";
import { AtualizacaoFormComponent } from "./atualizacao-form/atualizacao-form.component";
import { EdicaoFormComponent } from "./edicao-form/edicao-form.component";

@Component({
  selector: 'app-evento-editar',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, AtualizacaoFormComponent, EdicaoFormComponent],
  templateUrl: './evento-editar.component.html',
  styleUrl: './evento-editar.component.scss'
})
export class EventoEditarComponent
{
  id: string | null;
  evento: Evento | null;
  user: UsuarioAutenticado | null;

  constructor(
    private acService: AgendaCulturalService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // inicializa objetos
    this.evento = null;

    // recebe parametros
    this.user = null
    this.id = activatedRoute.snapshot.paramMap.get('id');

    // acessa usuario logado
    loginService
      .getSubject()
      .subscribe({
        next: (prm: Promise<UsuarioAutenticado | null>) => prm.then(this.loginServiceNext)
      })
      .unsubscribe();
  }

  
  loginServiceNext = (newUser: UsuarioAutenticado | null): void =>
  {
    this.user = newUser;

    // validacoes etc
    if(!this.user || this.user.usuario?.tipoUsuario != TipoUsuario.ORGANIZADOR){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHORGANIZADOR, this.id);
    }

    if(this.id == null){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
      return;
    }
      
    // processa parametros
    let idNum: number = parseInt(this.id);
    if(isNaN(idNum)){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
      return;
    }

    // realiza requests necessarios
    this.acService.getEvento(idNum).subscribe({
      next: this.eventoNext,
      error: this.eventoError
    });
  }


  eventoNext = (res: Resposta<Evento>): void =>
  {
    console.log("next: ", res);
    this.evento = res.response;

    if(!this.user || this.evento?.organizador?.id != this.user.usuario?.id){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHOWNER, this.id);
    }
  }


  eventoError = (res: HttpResponse<unknown>): void =>
  {
    console.log("error: ", res);
    NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
  }
}
