import { Component } from '@angular/core';
import { Usuario } from '../../../../interfaces/usuarios';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../../services/usuario-service/usuario.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-header.component.html',
  styleUrl: './usuario-header.component.scss'
})
export class UsuarioHeaderComponent
{
  user: Usuario | null = null;

  constructor(
    private userService: UsuarioService,
    private router: Router
  ) {
    userService
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
    if(this.userService.logout() && this.router.url === '/perfil')
      this.router.navigate(['/home']);    
  }
}
