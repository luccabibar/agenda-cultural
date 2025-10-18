import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AtualizacaoValidation } from './atualizacao-validation';
import { NovaAtualizacaoBody } from '../../../../interfaces/request-body/atualizacao-evento';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { Evento } from '../../../../interfaces/evento';
import { UsuarioAutenticado } from '../../../../interfaces/usuario/usuairo-autenticado';
import { NgIf } from "../../../../../node_modules/@angular/common/";

@Component({
  selector: 'app-atualizacao-form',
  standalone: true,
  imports: [ FormsModule, NgIf],
  templateUrl: './atualizacao-form.component.html',
  styleUrl: './atualizacao-form.component.scss'
})
export class AtualizacaoFormComponent
{
  locked: boolean;
  successMessage: string | null;
  errorMessage: string | null;  
  

  @Input("id") id: string | null;
  // @Input("id") set setId(id: string){
  //   if(id)
  //     this.id = id;
  // }
  
  @Input("evento") evento: Evento | null;
  // @Input("evento") set setEvento(ev: Evento){
  //   if(ev)
  //     this.evento = ev;
  // }
  
  @Input("user") user: UsuarioAutenticado | null;
  // @Input("user") set setUser(us: UsuarioAutenticado){
  //   if(us)
  //     this.user = us;
  // }


  constructor(
    private acService: AgendaCulturalService
  ) {
    this.locked = false;
    this.successMessage = null;
    this.errorMessage = null;

    this.id = null;
    this.evento = null;
    this.user = null;
  }


  addAtualizacao(dados: NgForm): void
  { 
    console.log("ADD ATUALIZACAO");
    console.log(this.id, this.evento, this.user);

    if(this.locked)
      return
      
    this.locked = true;
    this.successMessage = null;
    this.errorMessage = null;

    if(!this.user){
      this.errorMessage = 'Você precisa estar Logado como um organizador para criar um evento';
      this.locked = false;
      return;
    }

    console.log(dados.value)

    // valida body
    let res: boolean
    let msg: string
    
    [res, msg] = AtualizacaoValidation.isAtualizacaoValid(dados.value);  
    
    if(!res){
      this.errorMessage = msg;
      this.locked = false;
      return;
    }

    let body: NovaAtualizacaoBody = NovaAtualizacaoBody.of(dados.value);

    // TODO: UNCOMMENT
    // this.acService.postAtualizacaoEvento(Number(this.id), body, this.user)
    // .subscribe({
    //   next: this.addAtualizacaoNext,
    //   error: this.addAtualizacaoError
    // });
  }


  addAtualizacaoNext = (res: Resposta<Boolean>): void =>
  {
    console.log(res)

    if(res.response){
      this.successMessage = "Atualização adicionada com sucesso!";
      this.errorMessage = null;
      // this.locked = false; // delberadamente nao destranca pra evitar spammar
    }
    else {
      this.successMessage = null;
      this.errorMessage = "Erro inesperado ao criar atualização";
      this.locked = false; 
    }
  }

  
  addAtualizacaoError = (res: HttpResponse<any>): void =>
  {
    console.log(res);

    switch(res.status)
    {
    case 409:
      this.errorMessage = "Algum parametro é inválido";
      break;

    case 401:
    case 403:
      this.errorMessage = "Você precisa estar Logado como o dono deste evento para atualizá-lo";
      break;
    
    default:
      this.errorMessage = "Erro ao realizar a criação do evento";
    }
    
    
    this.successMessage = null;
    this.locked = false;
  }

}
