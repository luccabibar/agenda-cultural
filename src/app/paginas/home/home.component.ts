import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent 
{

  constructor(private acService: AgendaCulturalService)
  {
    this.acService.ping().subscribe(
    (res) => {
      console.log(res);
    });
  }

}
