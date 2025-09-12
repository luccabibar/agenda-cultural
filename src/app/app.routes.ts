import { Routes } from '@angular/router';
import { AgendaComponent } from './paginas/agenda/agenda.component';
import { BuscarComponent } from './paginas/buscar/buscar.component';
import { EventoComponent } from './paginas/evento/evento.component';
import { HomeComponent } from './paginas/home/home.component';

export const routes: Routes = 
[
    { path: 'agenda', component: AgendaComponent },
    { path: 'buscar', component: BuscarComponent },
    { path: 'evento/:id', component: EventoComponent },
    { path: 'home', redirectTo: '' },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' },
];
