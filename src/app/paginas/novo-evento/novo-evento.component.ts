import { Component } from '@angular/core';
import { LoginService } from '../../../services/login-service/login.service';
import { Router } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { NotFoundMode } from '../notfound/notFoundMode';
import { UsuarioAutenticado } from '../../../interfaces/usuario/usuairo-autenticado';
import { TipoUsuario } from '../../../interfaces/usuario/tipo-usuario';

@Component({
  selector: 'app-novo-evento',
  standalone: true,
  imports: [],
  templateUrl: './novo-evento.component.html',
  styleUrl: './novo-evento.component.scss'
})
export class NovoEventoComponent
{
  user: UsuarioAutenticado | null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.user = loginService.getUsuario();
    
    // TODO: uncomment
    // if(!this.user || this.user?.usuario?.tipoUsuario != TipoUsuario.ORGANIZADOR)
    //   NotfoundComponent.navegarParaNotFound(router, NotFoundMode.AUTHORGANIZADOR, router.url);
  }
}
