import { Component } from '@angular/core';
import { LoginService } from '../../../services/login-service/login.service';
import { Router } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { NotFoundMode } from '../notfound/notFoundMode';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { BuscarParams } from '../../../interfaces/buscar';
import { FormsModule, NgForm } from '@angular/forms';
import { NgForOf } from "../../../../node_modules/@angular/common";
import { NovoEventoBody } from '../../../interfaces/request-body/evento';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { EventoValidation } from './evento-validation';


@Component({
  selector: 'app-evento-novo',
  standalone: true,
  imports: [FormsModule, NgForOf],
  templateUrl: './evento-novo.component.html',
  styleUrl: './evento-novo.component.scss'
})
export class EventoNovoComponent
{
  locked: boolean;

  dropdowns: BuscarParams;
  user: UsuarioAutenticado | null;

  currImage: File | null
  
  errorMsg: string;

  constructor(
    private acService: AgendaCulturalService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.locked = false;
    this.errorMsg = '';

    this.currImage = null;

    this.user = null;
    this.dropdowns = new BuscarParams();

    // acessa usuario logado
    loginService
      .getSubject()
      .subscribe({
        next: (prm: Promise<UsuarioAutenticado | null>) => prm.then(this.loginServiceNext)
      })
      .unsubscribe();

    this.acService.filtrosEventos().subscribe(
    (result) => {
      console.log(result);
      if(result.response)
        this.dropdowns = result.response;
    });
  }


  loginServiceNext = (user: UsuarioAutenticado | null): void =>
  {
    this.user = user;
    
    if(!this.user || this.user?.usuario?.tipoUsuario != TipoUsuario.ORGANIZADOR)
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.AUTHORGANIZADOR, this.router.url);
  }


  setImagem(ev: Event)
  {
    this.errorMsg = '';
    let arquivo: File | null | undefined;    
    
    try {
      arquivo = (ev?.target as HTMLInputElement).files?.item(0);      
      
      if(arquivo && arquivo.type.match(/image\/[\w]+/)){
        console.log(arquivo);
        this.currImage = arquivo; 
      }
      else {
        this.errorMsg = "Arquivo selecionado não é valido";
      }
    }
    catch(ex){
      console.log(ex);
    } 
  }


  enviar(dados: NgForm): void
  {
    this.locked = true;
    this.errorMsg = '';

    if(this.user == null){
      this.errorMsg = 'Você precisa estar Logado como um organizador para criar um evento';
      this.locked = false;
      return;
    }

    console.log(dados.value)

    // verificacoes
    let res: boolean
    let msg: string
    
    [res, msg] = EventoValidation.isEventoValid(dados.value, this.currImage, this.dropdowns);  

    if(!res){
      this.errorMsg = msg;
      this.locked = false;
      return;
    }

    let body: NovoEventoBody = NovoEventoBody.of(dados.value);
    body.imagem = this.currImage;

    this.acService.postEvento(body, this.user).subscribe({
      next: this.enviarNext,
      error: this.enviarError
    });    
  }


  enviarNext = (res: Resposta<number>): void => 
  {
    console.log("next: ", res);
    
    let id: number | null = res.response;
    
    if(id && id > 0)
      this.router.navigate(['/evento', res.response]);
    else{
      this.errorMsg = "Erro ao finalizar criação do seu evento (verifique em seu perfil se ele foi criado corretamente)"
      // this.locked = false // deliberadamente nao destranca
    }
  }

  
  enviarError = (res: HttpResponse<unknown>): void => 
  {
    console.log("error: ", res);

    switch(res.status)
    {
    case 409:
      this.errorMsg = "Algum parametro é inválido";
      break;

    case 415:
      this.errorMsg = "MediaType da imagem é invalido";
      break;

    case 401:
    case 403:
      this.errorMsg = "Você precisa estar Logado como um organizador para criar um evento";
      break;
    
    case 500:
      this.errorMsg = "Erro inesperado do servidor ao criar o evento";
      break;

    default:
      this.errorMsg = "Erro ao realizar a criação do evento";
    }

    this.locked = false;
  }
}