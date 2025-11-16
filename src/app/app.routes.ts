import { Routes } from '@angular/router';
import { AgendaComponent } from './paginas/agenda/agenda.component';
import { EventoBuscarComponent } from './paginas/evento-buscar/evento-buscar.component';
import { EventoComponent } from './paginas/evento/evento.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginCadastroComponent } from './paginas/login-cadastro/login-cadastro.component';
import { NotfoundComponent } from './paginas/notfound/notfound.component';
import { EventoNovoComponent } from './paginas/evento-novo/evento-novo.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { EventoEditarComponent } from './paginas/evento-editar/evento-editar.component';
import { EventoApagarComponent } from './paginas/evento-apagar/evento-apagar.component';
import { EventoAnalisarComponent } from './paginas/evento-analisar/evento-analisar.component';

export const routes: Routes = 
[
    { path: 'agenda',               component: AgendaComponent },
    { path: 'buscar',               component: EventoBuscarComponent },
    { path: 'evento/novo',          component: EventoNovoComponent },
    { path: 'evento/:id',           component: EventoComponent },
    { path: 'evento/:id/editar',    component: EventoEditarComponent },
    { path: 'evento/:id/apagar',    component: EventoApagarComponent },
    { path: 'evento/:id/analise',   component: EventoAnalisarComponent },
    { path: 'perfil',               component: PerfilComponent },
    { path: 'login',                component: LoginCadastroComponent },
    { path: 'cadastro',             component: LoginCadastroComponent },
    { path: 'home',                 redirectTo: '' },
    { path: '',                     component: /* HomeComponent */ AgendaComponent},
    { path: '**',                   component: NotfoundComponent },
];
