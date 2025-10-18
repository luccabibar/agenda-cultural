import { Component, Input } from '@angular/core';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { HttpResponse } from '@angular/common/http';
import { BuscarParams } from '../../../../interfaces/buscar';
import { Resposta } from '../../../../interfaces/resposta';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgForOf } from "../../../../../node_modules/@angular/common/";
import { Evento } from '../../../../interfaces/evento';
import { UsuarioAutenticado } from '../../../../interfaces/usuario/usuairo-autenticado';

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

      this.loadDefaults();
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


  loadDefaults(): void
  {
    // deve executar depois que ambos evento e dropdowns foram carregados
    if(!this.evento || !this.dropdowns){
      this.errorMessage = "Erro ao carregar dados do evento, Tente recarregar a página";
      this.locked = true;

      return;
    }
    
    console.log(this.evento, this.dropdowns);
    
  }


  editar(dados: NgForm): void
  {
    console.log("PATCH EVENTO");
    console.log(this.id, this.evento, this.user);

    this.locked = true;
    this.successMessage = null;
    this.errorMessage = null;




    // dados

    // validas
    if(!this.user){
      this.locked = false; 
      this.errorMessage = "bla";
      return;
    }
    
    // processa parametros

    // this.acService.patchEvento(Number(this.id), dados, this.user)
    // .subscribe({
    //   next: this.editarNext,
    //   error: this.editarError
    // });
  }
 

  editarNext = (res: Resposta<unknown>): void =>
  {
    // this.locked = false;
    this.successMessage = null;
    this.errorMessage = null;

  }

  
  editarError = (res: HttpResponse<unknown>): void =>
  {
    this.locked = false;
    this.successMessage = null;
    this.errorMessage = null;

  }
}
