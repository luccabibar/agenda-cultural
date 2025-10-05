import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { LoginBody } from '../../../../interfaces/cadastro-login';
import { LoginService } from '../../../../services/login-service/login.service';
import { Resposta } from '../../../../interfaces/resposta';
import { Usuario } from '../../../../interfaces/usuario/usuarios';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { UsuarioAutenticado } from '../../../../interfaces/usuario/usuairo-autenticado';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent
{
  errorMsg: string;

  constructor(
      private acService: AgendaCulturalService,
      private loginService: LoginService,
      private router: Router
  ) { 
    this.errorMsg = "";
  }


  login(dados: NgForm): void
  {
    console.log(dados.value);
    
    this.errorMsg = "";
    
    if(!dados.valid){
      this.errorMsg = "??";
      return;
    }

    let body: LoginBody = LoginBody.of(dados.value);

    this.acService.login(body).subscribe({
      next: this.loginNext,
      error: this.loginError
    });    
  }


  // callbacks nao devem ser metodos direto da classe, devem ser definidos como variaveis 
  loginNext = (res: Resposta<UsuarioAutenticado>): void =>
  {
    console.log("loginNext: ", res);

    if(res.response)
      if(this.loginService.login(res.response))
        this.router.navigate(['/home']);
      else
        this.errorMsg = "Erro inesperado ao realizar login (voce ja nao esta logado?)"
  }


  // callbacks nao devem ser metodos direto da classe, devem ser definidos como variaveis 
  loginError = (res: HttpResponse<unknown>): void =>
  {
    console.log("loginError: ", res);

    switch(res.status)
    {
    case 500:
      this.errorMsg = "Erro inesperado ao realizar login";
      break;

    case 401:
    case 404:
      this.errorMsg = "Email ou senha incorreto";
      break;
    
    default:
      this.errorMsg = "Erro ao realizar login";
    }
    
  }
}
