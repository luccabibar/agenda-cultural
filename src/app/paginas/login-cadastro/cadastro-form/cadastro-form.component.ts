import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { LoginService } from '../../../../services/login-service/login.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Resposta } from '../../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';
import { CadastroOrganizadorBody, CadastroPessoaBody } from '../../../../interfaces/request-body/cadastro-login';
import { CkeckCpfCnpj } from '../../../../utils/checagens';

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss'
})
export class CadastroFormComponent 
{
  isOrganizador: boolean;
  errorMsg: string;
  sucessMsg: string;

  constructor(
      private acService: AgendaCulturalService,
      private loginService: LoginService,
      private router: Router
  ) { 
    this.isOrganizador = false;
    this.errorMsg = "";
    this.sucessMsg = "";
  }


  setOrganizador(value: boolean)
  {
    this.errorMsg = "";
    this.sucessMsg = "";

    this.isOrganizador = value;
  }


  validaSenha(dados: NgForm): boolean { return dados.value.senha != dados.value.senhaConfirm; }
  validaCpf(dados: NgForm): boolean { return CkeckCpfCnpj.isCpfCnpjValid(dados.value.cpf); }


  cadastrar(dados: NgForm): void
  {
    this.errorMsg = "";
    this.sucessMsg = "";

    console.log(dados.value);

    // TODO: verificacoes mais robustas
    
    // verificacoes
    if(!this.validaSenha(dados)){
      this.errorMsg = "A senha não corresponde à sua confirmação";
      return;
    }

    if(this.isOrganizador && !this.validaCpf(dados)){
      this.errorMsg = "O CPF ou CNPJ é invalido";
      return;
    }

    if(!dados.valid){
      this.errorMsg = "??";
      return;
    }

    // detalehs ligeiramente diferentes para organizador ou nao
    if(this.isOrganizador){
      let body: CadastroOrganizadorBody = CadastroOrganizadorBody.of(dados.value);

      body.cpf = CkeckCpfCnpj.limpaCpfCnpj(body.cpf ? body.cpf : "  ");
      
      this.acService.cadastrarOrganizador(body).subscribe({
        next: this.cadastroNext,
        error: this.cadastroError
      });    
    }
    else{
      let body: CadastroPessoaBody = CadastroPessoaBody.of(dados.value);

      this.acService.cadastrarPessoa(body).subscribe({
        next: this.cadastroNext,
        error: this.cadastroError
      });    
    }
  }


  // callbacks nao devem ser metodos direto da classe, devem ser definidos como variaveis 
  cadastroNext = (res: Resposta<boolean>): void =>
  {
    console.log("next: ", res);

    if(res.response)
      this.sucessMsg = "Cadastro realizado! Verifique seu email para confirmá-lo"

      else
        this.errorMsg = "Erro inesperado ao realizar login (voce ja nao esta logado?)"
  }


  // callbacks nao devem ser metodos direto da classe, devem ser definidos como variaveis 
  cadastroError = (res: HttpResponse<unknown>): void =>
  {
    console.log("error: ", res);

    switch(res.status)
    {
    case 409:
      this.errorMsg = this.isOrganizador ? "Algum parametro é inválido (verifique se o CPF ou CNPJ é valido)" : "Algum parametro é inválido";
      break;

    case 403:
      this.errorMsg = "Tente utilizar outro nome de usuário ou e-mail";
      break;
    
    default:
      this.errorMsg = "Erro ao realizar o cadastro";
    }
  }
}
