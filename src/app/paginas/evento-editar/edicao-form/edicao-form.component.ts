import { Component, Input } from '@angular/core';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { HttpResponse } from '@angular/common/http';
import { BuscarParams } from '../../../../interfaces/buscar';
import { Resposta } from '../../../../interfaces/resposta';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgForOf } from "../../../../../node_modules/@angular/common/";
import { Evento } from '../../../../interfaces/evento';
import { UsuarioAutenticado } from '../../../../interfaces/usuario/usuairo-autenticado';
import { EdicaoEventoBody } from '../../../../interfaces/request-body/edicao-evento';
import { EditEventoValidation } from './edit-evento-validation';

@Component({
  selector: 'app-edicao-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './edicao-form.component.html',
  styleUrl: './edicao-form.component.scss'
})
export class EdicaoFormComponent
{
  locked: boolean;
  successMessage: string | null;
  errorMessage: string | null;

  dropdowns: BuscarParams;
  

  @Input("id") id: string | null;
  // @Input("id") set setId(id: string){
  //   if(id)
  //     this.id = id;
  // }
  
  @Input("evento") evento: Evento | null;
  // @Input("evento") set setEvento(ev: Evento | null){
  //   if(ev){
  //     this.evento = ev;
  //   }
  // }
  
  @Input("user") user: UsuarioAutenticado | null;
  // @Input("user") set setUser(us: UsuarioAutenticado){
  //   if(us)
  //     this.user = us;
  // }


  constructor(
    private acService: AgendaCulturalService
  ) {
    this.locked = false
    this.successMessage = null;
    this.errorMessage = null;

    this.dropdowns = new BuscarParams();

    this.id = null;
    this.evento = null;
    this.user = null;

    this.acService.filtrosEventos().subscribe({
      next: this.paramsNext,
      error: this.paramsError
    });
  }


  paramsNext = (res: Resposta<BuscarParams>): void =>
  {
    if(res.response){
      this.dropdowns = res.response;

    }
    else{
      this.errorMessage = "Erro ao carregar opções de edição, Tente recarregar a página";
      this.locked = true;
    }
  }


  paramsError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);

    this.errorMessage = "Erro ao carregar opções de edição, Tente recarregar a página";
    this.locked = true;
  }


  filterFormData(dados: { [key: string]: any }, evento: Evento): { [key: string]: any }
  {
    let obj: { [key: string]: any } = {}
    
    if(dados['descricao'] && dados['descricao'] != evento.descricao)
      obj['descricao'] = dados['descricao'];
    
    if(dados['contato'] && dados['contato'] != evento.contato)
      obj['contato'] = dados['contato'];
    
    if(dados['horaIni'] && dados['horaIni'] != evento.horarioInicio)
      obj['horaIni'] = dados['horaIni'];
    
    if(dados['horaFim'] && dados['horaFim'] != evento.horarioFim)
      obj['horaFim'] = dados['horaFim'];
    
    if(dados['regiao'] && dados['regiao'] != evento.regiao)
      obj['regiao'] = dados['regiao'];
    
    if(dados['endereco'] && dados['endereco'] != evento.endereco)
      obj['endereco'] = dados['endereco'];

    return obj;
  }


  editar(dados: NgForm): void
  {
    if(this.locked)
      return

    this.locked = true;
    this.successMessage = null;
    this.errorMessage = null;

    if(!this.user){
      this.locked = false; 
      this.errorMessage = "Você precisa estar logado como o dono deste recurso para editá-lo";
      return;
    }

    if(!this.evento){
      this.locked = false; 
      this.errorMessage = "Erro ao carregar dados do evento, Tente recarregar a página";
      return;
    }

    // trata dados
    let dadosFiltrados = this.filterFormData(dados.value, this.evento);

    // valida body
    let res: boolean
    let msg: string
    
    [res, msg] = EditEventoValidation.isEditValid(dadosFiltrados, this.evento, this.dropdowns);  
    
    console.log(dados.value, dadosFiltrados);
    
    if(!res){
      this.errorMessage = msg;
      this.locked = false;
      return;
    }

    this.locked = false;
    let body: EdicaoEventoBody = EdicaoEventoBody.of(dadosFiltrados as EdicaoEventoBody);
    
    this.acService.patchEvento(Number(this.id), body, this.user)
    .subscribe({
      next: this.editarNext,
      error: this.editarError
    });
  }
 

  editarNext = (res: Resposta<boolean>): void =>
  {
    console.log(res)

    if(res.response){
      this.successMessage = "Edição realizada com sucesso!";
      this.errorMessage = null;
      // this.locked = false; // delberadamente nao destranca pra evitar spammar
    }
    else {
      this.successMessage = null;
      this.errorMessage = "Erro inesperado ao criar atualização";
      this.locked = false; 
    }
  }

  
  editarError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);

    switch(res.status)
    {
    case 409:
      this.errorMessage = "Algum parametro é inválido";
      break;

    case 401:
    case 403:
      this.errorMessage = "Você precisa estar Logado como o dono deste evento para editá-lo";
      break;
    
    default:
      this.errorMessage = "Erro ao realizar a edição do evento";
    }
    
    this.successMessage = null;
    this.locked = false;
  }
}
