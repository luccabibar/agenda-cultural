import { Component } from '@angular/core';
import { Usuario } from '../../../../interfaces/usuario/usuarios';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../../services/login-service/login.service';
import { Router, RouterLink } from '@angular/router';
import { UsuarioAutenticado } from '../../../../interfaces/usuario/usuairo-autenticado';

@Component({
  selector: 'app-usuario-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-header.component.html',
  styleUrl: './usuario-header.component.scss'
})
export class UsuarioHeaderComponent
{
  user: UsuarioAutenticado | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    loginService
      .getSubject()
      .subscribe(
        (val) => {
          console.log(val)

          this.user = val;
        }
      );
  } 


  logout()
  {
    if(this.loginService.logout() /* && this.router.url === '/perfil' */)
      this.router.navigate(['/home']);    
  }
}
