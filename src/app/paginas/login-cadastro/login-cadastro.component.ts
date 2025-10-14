import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { LoginService } from '../../../services/login-service/login.service';
import { Router } from '@angular/router';
import { NotFoundMode } from '../notfound/notFoundMode';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';

@Component({
  selector: 'app-login-cadastro',
  standalone: true,
  imports: [ LoginFormComponent, CadastroFormComponent ],
  templateUrl: './login-cadastro.component.html',
  styleUrl: './login-cadastro.component.scss'
})
export class LoginCadastroComponent
{
  order: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.order = true;
    
    // acessa usuario logado
    loginService
      .getSubject()
      .subscribe({
        next: (prm: Promise<UsuarioAutenticado | null>) => prm.then(this.loginServiceNext)
      })
      .unsubscribe();
  }


  loginServiceNext = (user: UsuarioAutenticado | null): void =>
  {
    // se user ja esta logado
    if(user){
      NotfoundComponent.navegarParaNotFound(this.router, NotFoundMode.LOGIN, this.router.url);
      return;
    }
    

    if(this.router.url === '/login')
      this.order = true;
    else if(this.router.url === '/cadastro')
      this.order = false;
    else
      this.order = Math.floor(Math.random() * 2) ? true : false; // we gamblin;
  }
}
