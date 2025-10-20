import { Component } from '@angular/core';
import { Evento } from '../../../interfaces/evento';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { LoginService } from '../../../services/login-service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';
import { NotFoundMode } from '../notfound/notFoundMode';
import { NotfoundComponent } from '../notfound/notfound.component';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { NgIf } from "../../../../node_modules/@angular/common/";

@Component({
  selector: 'app-evento-apagar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './evento-apagar.component.html',
  styleUrl: './evento-apagar.component.scss'
})
export class EventoApagarComponent
{
  locked: boolean | null
  successMessage: string | null
  errorMessage: string | null

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
    
    this.locked = false
    this.successMessage = null;
    this.errorMessage = null;

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


  manter(): void
  {
    if(this.locked)
      return

    this.router.navigate(['/perfil']);
  }


  editar(): void
  {
    if(this.locked)
      return

    this.router.navigate(['/evento', this.id, 'editar']);
  }


  apagar(): void
  {
    if(this.locked)
      return

    this.locked = true;
    this.errorMessage = null;
    this.successMessage = null;

    let idNum = Number(this.id);

    if(isNaN(idNum) || !this.user){
      this.locked = false;
      this.errorMessage = "Erro ao tentar apagar, tente recarregar a página";

      return;
    }

    this.acService.deleteEvento(idNum, this.user).subscribe({
      next: this.apagarNext,
      error: this.apagarError,
    })
  }


  apagarNext = (res: Resposta<boolean>): void =>
  {
    if(res.response){
      this.successMessage = "Evento apagado com sucesso";
      // this.locked = false;
    }
    else{
      this.errorMessage = "Erro inesperado ao apagar evento";
      this.locked = false;
    }
  }


  apagarError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
    
    switch(res.status)
    {
    case 401:
    case 403:
      this.errorMessage = "Você precisa estar Logado como o dono deste evento para apagá-lo";
      break;
    
    default:
      this.errorMessage = "Erro ao apagar o evento";
    }
    
    this.successMessage = null;
    this.locked = false;
  }
}
