import { Routes } from '@angular/router';

import { AgendaComponent } from './agenda/agenda.component';
import { BuscarComponent } from './buscar/buscar.component';
import { EventoComponent } from './evento/evento.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = 
[
    { path: 'agenda', component: AgendaComponent },
    { path: 'buscar', component: BuscarComponent },
    { path: 'evento', component: EventoComponent },
    { path: 'home', redirectTo: '' },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' },
];
