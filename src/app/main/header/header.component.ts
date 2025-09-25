import { Component } from '@angular/core';
import { UsuarioHeaderComponent } from './login-header/usuario-header.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UsuarioHeaderComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
