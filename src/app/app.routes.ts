import { Routes } from '@angular/router';
import { AgendaComponent } from './paginas/agenda/agenda.component';
import { BuscarComponent } from './paginas/buscar/buscar.component';
import { EventoComponent } from './paginas/evento/evento.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginCadastroComponent } from './paginas/login-cadastro/login-cadastro.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';

export const routes: Routes = 
[
    { path: 'agenda',        component: AgendaComponent },
    { path: 'buscar',        component: BuscarComponent },
    { path: 'evento/:id',    component: EventoComponent },
    { path: 'perfil',        component: HomeComponent /* PerfilComponent */ },
    { path: 'login',         component: LoginCadastroComponent },
    { path: 'cadastro',      component: LoginCadastroComponent },
    { path: 'home',          redirectTo: '' },
    { path: '',              component: HomeComponent },
    { path: '**',            component: NotfoundComponent },
];
