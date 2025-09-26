import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { LoginBody } from '../../../../interfaces/cadastro-login';
import { UsuarioService } from '../../../../services/usuario-service/usuario.service';
import { Resposta } from '../../../../interfaces/resposta';
import { Usuario } from '../../../../interfaces/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent
{
  constructor(
      private acService: AgendaCulturalService,
      private userService: UsuarioService,
      private router: Router
  ) { }

  login(dados: NgForm): void
  {
    console.log(dados.value);
    
    if(!dados.valid)
      return;

    let body: LoginBody = LoginBody.of(dados.value);

    this.acService.login(body).subscribe(
    (response: Resposta<Usuario>) => {
      console.log(response);

      if(response.response)
        if(this.userService.login(response.response))
          this.router.navigate(['/home']);    
    });
  }
}
