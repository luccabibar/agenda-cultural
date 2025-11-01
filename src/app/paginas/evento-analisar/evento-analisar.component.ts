import { Component } from '@angular/core';
import { Evento, StatusEvento } from '../../../interfaces/evento';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { LoginService } from '../../../services/login-service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';
import { NotfoundComponent } from '../notfound/notfound.component';
import { NotFoundMode } from '../notfound/notFoundMode';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { AnaliseEventoBody } from '../../../interfaces/request-body/analise-evento';
import { CommonModule, NgIf } from "../../../../node_modules/@angular/common/";

@Component({
  selector: 'app-evento-analisar',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './evento-analisar.component.html',
  styleUrl: './evento-analisar.component.scss'
})
export class EventoAnalisarComponent
{
  id: string | null;
  evento: Evento | null;
  user: UsuarioAutenticado | null;

  locked: boolean;
  errorMessage: string | null;
  successMessage: string | null;

  constructor(
    private acService: AgendaCulturalService,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // inicializa objetos
    this.locked = true;
    this.successMessage = null;
    this.errorMessage = null;
    
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
    if(!this.user){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHOWNER, this.id);
      return;
    }
    else if(this.user.usuario?.tipoUsuario != TipoUsuario.MODERADOR){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHMODERADOR, this.id);
      return;
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

    // se o organizador tentar navegar
    if(this.user && this.evento?.organizador?.id == this.user.usuario?.id){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHMODERADOR, this.id);
      return;
    }
    // else se alguem tentar navegar
    else if(!this.user || this.evento?.moderador?.id != this.user.usuario?.id){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHOWNER, this.id);
      return;
    }
    // else se alguem tentar navegar
    else if(this.evento?.status != StatusEvento.EMANALISE){
      this.router.navigate(['/evento', this.id]);
      return;
    }

    this.locked = false;
  }


  eventoError = (res: HttpResponse<unknown>): void =>
  {
    console.log("error: ", res);
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.EVENTO, this.id);
  }


  voltar()
  {
    this.router.navigate(['/perfil']);
  }


  reprovarEvento()
  {
    if(this.locked)
      return;
    else{
      this.locked = true;
      this.errorMessage = null;
      this.successMessage = null;
    }

    if(!this.evento || !this.evento.id || !this.user){
      this.errorMessage = "Usuario ou Evento não definidos";
      this.locked = false;
      return;
    }


    let veredito = new AnaliseEventoBody();
    veredito.status = StatusEvento.REPROVADO;

    this.acService.analiseEvento(veredito, this.evento.id, this.user)
    .subscribe({
      next: this.analiseNext,
      error: this.analiseError  
    });
  }


  aprovarEvento()
  {
    if(this.locked)
      return;
    else{
      this.locked = true;
      this.errorMessage = null;
      this.successMessage = null;
    }

    if(!this.evento || !this.evento.id || !this.user){
      this.errorMessage = "Usuario ou Evento não definidos";
      this.locked = false;
      return;
    }

    let veredito = new AnaliseEventoBody();
    veredito.status = StatusEvento.APROVADO;

    this.acService.analiseEvento(veredito, this.evento.id, this.user)
    .subscribe({
      next: this.analiseNext,
      error: this.analiseError  
    });
  }


  analiseNext = (res: Resposta<boolean>): void =>
  {
    console.log(res)

    if(res.response){
      this.successMessage = "Evento analisado com sucesso!";
      this.errorMessage = null;
      // this.locked = false; // delberadamente nao destranca pra evitar spammar
    }
    else {
      this.successMessage = null;
      this.errorMessage = "Erro inesperado ao analisar evento";
      this.locked = false; 
    }
  }


  analiseError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);

    switch(res.status)
    {
    case 409:
      this.errorMessage = "Algum parametro é inválido";
      break;

    case 401:
    case 403:
      this.errorMessage = "Você precisa estar Logado como o moderador deste evento para editá-lo";
      break;
    
    default:
      this.errorMessage = "Erro ao realizar a edição do evento";
    }

    this.locked = false;
  }
}
