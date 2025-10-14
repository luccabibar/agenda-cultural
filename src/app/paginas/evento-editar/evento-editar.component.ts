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
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from "../../../../node_modules/@angular/common";
import { AtualizacaoValidation } from './atualizacao-validation';
import { NovaAtualizacaoBody } from '../../../interfaces/request-body/atualizacao-evento';

@Component({
  selector: 'app-evento-editar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './evento-editar.component.html',
  styleUrl: './evento-editar.component.scss'
})
export class EventoEditarComponent
{
  id: string | null;
  evento: Evento | null;

  user: UsuarioAutenticado | null;

  attLocked: boolean;
  attSuccessMessage: string | null;
  attErrorMessage: string | null;

  constructor(
    private acService: AgendaCulturalService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // inicializa objetos
    this.evento = null;

    this.attLocked = false
    this.attSuccessMessage = null;
    this.attErrorMessage = null;

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

  
  // metodos da atualizacao
  addAtualizacao(dados: NgForm): void
  {
    if(this.attLocked)
      return
      
    this.attLocked = true;
    this.attSuccessMessage = null;
    this.attErrorMessage = null;

    if(this.user == null){
      this.attErrorMessage = 'Você precisa estar Logado como um organizador para criar um evento';
      this.attLocked = false;
      return;
    }

    console.log(dados.value)

    // valida body
    let res: boolean
    let msg: string
    
    [res, msg] = AtualizacaoValidation.isAtualizacaoValid(dados.value);  
    
    if(!res){
      this.attErrorMessage = msg;
      this.attLocked = false;
      return;
    }

    let body: NovaAtualizacaoBody = NovaAtualizacaoBody.of(dados.value);

    this.acService.postAtualizacaoEvento(Number(this.id), body, this.user)
    .subscribe({
      next: this.addAtualizacaoNext,
      error: this.addAtualizacaoError
    });
  }


  addAtualizacaoNext = (res: Resposta<Boolean>): void =>
  {
    console.log(res)

    if(res.response){
      this.attSuccessMessage = "Atualização adicionada com sucesso!";
      this.attErrorMessage = null;
      // this.attLocked = false; // delberadamente nao destranca pra evitar spammar
    }
    else {
      this.attSuccessMessage = null;
      this.attErrorMessage = "Erro inesperado ao criar atualização";
      this.attLocked = false; 

    }
  }

  
  addAtualizacaoError = (res: HttpResponse<any>): void =>
  {
    console.log(res);

    switch(res.status)
    {
    case 409:
      this.attErrorMessage = "Algum parametro é inválido";
      break;

    case 401:
    case 403:
      this.attErrorMessage = "Você precisa estar Logado como o dono deste evento para atualizá-lo";
      break;
    
    default:
      this.attErrorMessage = "Erro ao realizar a criação do evento";
    }
    
    
    this.attSuccessMessage = null;
    this.attLocked = false;
  }

  // metodos da edicao
}
