import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NotFoundMode } from './notFoundMode';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from "../../../../node_modules/@angular/common";

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink, NgSwitch, NgSwitchDefault, NgSwitchCase],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent
{
  getNotFoundMode = NotFoundMode;
  mode: NotFoundMode;
  resource: string = "";

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    let params = activeRoute.snapshot.queryParamMap;
    
    let res: string | null = params.get('resource');
    let mod: NotFoundMode | null = NotFoundMode.parse(params.get('mode'));
    
    console.log(params, res, mod);    

    if(mod && res){
      this.mode = mod;
      this.resource = res;
    }
    else{
      this.mode = NotFoundMode.DEFAULT;
      this.resource = router.url;
    }
  }


  public static navegarParaNotFound(
    router: Router,
    mode?: NotFoundMode,
    resource?: any
  ) {
    
    if(mode && resource){
      let notFoundParams = {
        'mode': mode,
        'resource': (resource + '')
      }
      
      router.navigate(['/notfound'], { queryParams: notFoundParams });
    }
    else{
      router.navigate(['/notfound']);
    }
  }
}
