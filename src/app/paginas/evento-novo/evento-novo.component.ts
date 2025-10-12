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
import { DatetimeUtil } from '../../../utils/datetime';
import { NovoEventoBody } from '../../../interfaces/request-body/evento';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';


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

  droprowns: BuscarParams;
  user: UsuarioAutenticado | null;
  
  errorMsg: string;

  constructor(
    private acService: AgendaCulturalService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.locked = false;
    this.errorMsg = '';

    // verificacao user
    this.user = loginService.getUsuario();
    
    if(!this.user || this.user?.usuario?.tipoUsuario != TipoUsuario.ORGANIZADOR)
      NotfoundComponent.navegarParaNotFound(router, NotFoundMode.AUTHORGANIZADOR, router.url);
      
    // dados do form
    this.droprowns = new BuscarParams();

    // realiza requests necessarios
    acService.filtrosEventos().subscribe(
      (result) => {
        console.log(result);
        if(result.response)
          this.droprowns = result.response;
      });
    
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
    
    [res, msg] = this.isEventoValid(dados.value, this.droprowns);  

    if(!res){
      this.errorMsg = msg;
      this.locked = false;
      return;
    }

    let body: NovoEventoBody = NovoEventoBody.of(dados.value);

    this.acService.postEvento(body, this.user).subscribe({
      next: this.enviarNext,
      error: this.enviarError
    });    
  }


  public isEventoValid(dadosEvento: { [key: string]: any }, dadosDropdown: BuscarParams): [boolean, string] 
  {
    try{
      // nome
      let nome: string = dadosEvento['nome'];
      if(nome.length < 4)   return [false, "Nome do evento deve ter, ao menos, 5 caracteres"];
      if(nome.length > 24)  return [false, "Nome do evento deve ter, no máximo, 24 caracteres"];
        
      // descricao
      let descricao: string = dadosEvento['descricao'];
      if((descricao as string).length <= 0)   return [false, "Descrição do evento não deve ser vazia"];
      if((descricao as string).length > 256)  return [false, "Descrição do evento deve ter, no máximo, 256 caracteres"];
        
      // descricao
      let categoria: string = dadosEvento['categoria'];
      if(!(dadosDropdown.categorias.includes(categoria)))  return [false, "Uma Categoria deve ser selecionada"];

      // contato
      let contato: string = dadosEvento['contato'];
      if(contato.length <= 0)  return [false, "Contato do evento não deve ser vazio"];
      if(contato.length > 32)  return [false, "Contato do evento deve ter, no máximo, 24 caracteres"];

      // horario
      let horaIni: string = dadosEvento['horaIni'];
      if (!DatetimeUtil.isDateTimeValid(horaIni)) return [false, "Data/Horário de início do evento é inválido"];
      
      let horaFim: string = dadosEvento['horaFim'];
      if (!DatetimeUtil.isDateTimeValid(horaFim)) return [false, "Data/Horário de fim do evento é inválido"];
      
      let cmpIniFim: number = DatetimeUtil.compareDateTime(horaIni, horaFim); 
      let cmpIniNow: number = DatetimeUtil.compareDateTime(horaIni, DatetimeUtil.agora()); 
      if (isNaN(cmpIniFim) || isNaN(cmpIniFim)) return [false, "Erro inesperado ao validar valor dos Horáirios"];
      if (cmpIniFim >= 0)                       return [false, "O início do evento não pode ser agendado para depois de seu fim"];
      if (cmpIniNow <= 0)                       return [false, "O início do evento não pode ser agendado para uma data que já passada"];
      
      // regiao
      let regiao: string = dadosEvento['regiao'];
      if (!(dadosDropdown.regioes.includes(regiao)))  return [false, "Uma região deve ser selecionada"];

      // endereco
      let endereco = dadosEvento['endereco'];
      if(endereco.length <= 0)  return [false, "Endereco do evento não deve ser vazio"];
      if(endereco.length > 64)  return [false, "Endereco do evento deve ter, no máximo, 64 caracteres"]; 
    }
    catch(ex: any)  {
      return [false, "NovoEventoComponent: erro inesperado ao validar dados do form: " + ex];
    }
    

    return [true, ":D"];
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

    case 401:
    case 403:
      this.errorMsg = "Você precisa estar Logado como um organizador para criar um evento";
      break;
    
    default:
      this.errorMsg = "Erro ao realizar a criação do evento";
    }

    this.locked = false;
  }
}