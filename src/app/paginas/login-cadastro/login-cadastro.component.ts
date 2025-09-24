import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';
import { Usuario } from '../../../interfaces/usuarios';
import { UsuarioService } from '../../../services/usuario-service/usuario.service';

@Component({
  selector: 'app-login-cadastro',
  standalone: true,
  imports: [ LoginFormComponent, CadastroFormComponent ],
  templateUrl: './login-cadastro.component.html',
  styleUrl: './login-cadastro.component.scss'
})
export class LoginCadastroComponent
{
  order: boolean = Math.floor(Math.random() * 2) ? true : false; // we gamblin

  constructor(private userService: UsuarioService) 
  {
    let curr: Usuario | null = userService.getUsuario();

    if(curr)
      curr = curr;// TODO: navegar pra FORA
  }
}
