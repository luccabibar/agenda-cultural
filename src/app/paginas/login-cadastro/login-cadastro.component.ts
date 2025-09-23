import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { CadastroFormComponent } from './cadastro-form/cadastro-form.component';

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
}
