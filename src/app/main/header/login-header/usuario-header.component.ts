import { Component } from '@angular/core';
import { Usuario } from '../../../../interfaces/usuarios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-header.component.html',
  styleUrl: './usuario-header.component.scss'
})
export class UsuarioHeaderComponent
{
  user: Usuario | null = null;
}
