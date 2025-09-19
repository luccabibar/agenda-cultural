import { Component } from '@angular/core';
import { UsuarioHeaderComponent } from './login-header/usuario-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ UsuarioHeaderComponent ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
