import { Component } from '@angular/core';
import { UsuarioHeaderComponent } from './login-header/usuario-header.component';
import { Router, RouterLink } from "@angular/router";
import { BuscarDados } from '../../../interfaces/buscar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UsuarioHeaderComponent, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent 
{
  textoBusca: string;

  constructor(
    private router: Router
  ) {
    this.textoBusca = "";
  }


  buscar()
  {
    let texto = this.textoBusca.trim();  

    if(texto.length <= 0){
      this.router.navigate(['/buscar']);
      return;
    }
    else{
      let filtros = new BuscarDados();
      filtros.texto = texto;

      this.router.navigate(['/buscar'], { queryParams: filtros })
    }
  }
}
