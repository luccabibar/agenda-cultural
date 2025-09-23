import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AgendaCulturalService } from '../../../../services/agenda-cultural-service/agenda-cultural.service';
import { LoginBody } from '../../../../interfaces/cadastro-login';

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
      private acService: AgendaCulturalService
  ) {

  }

  login(dados: NgForm): void
  {
    console.log(dados.value);
    
    if(!dados.valid)
      return;

    let body: LoginBody = LoginBody.of(dados.value);

    this.acService.login(body).subscribe(
    (response) => {
      console.log(response);
    });
  }
}
