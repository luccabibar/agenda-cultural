import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { Usuario } from '../../../interfaces/usuarios';
import { UsuarioService } from '../../../services/usuario-service/usuario.service';
import { Router } from '@angular/router';
import { NotFoundMode } from '../notfound/notFoundMode';
import { NotfoundComponent } from '../notfound/notfound.component';

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
    private userService: UsuarioService,
    private router: Router
  ) {
    this.order = true;
    let curr: Usuario | null = userService.getUsuario();
    
    // se user ja esta logado
    if(curr){
      NotfoundComponent.navegarParaNotFound(router, NotFoundMode.LOGINCADASTRO, router.url);
      return;
    }
    
    
    if(router.url === '/login')
      this.order = true;
    else if(router.url === '/cadastro')
      this.order = false;
    else
      this.order = Math.floor(Math.random() * 2) ? true : false; // we gamblin;
  }

}
