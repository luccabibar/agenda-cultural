import { Component } from '@angular/core';
import { AgendaCulturalService } from '../../../services/agenda-cultural-service/agenda-cultural.service';
import { RouterLink } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { UploadImagem } from '../../../interfaces/imagem';
import { Resposta } from '../../../interfaces/resposta';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent 
{
  imagem: File | null;

  constructor(private acService: AgendaCulturalService)
  {
    this.imagem = null;

    this.acService.ping().subscribe(
    (res) => {
      console.log(res);
    });
  }


  uploadImagem(ev: Event)
  {
    let arquivo: File | null | undefined;

    try {
      arquivo = (ev?.target as HTMLInputElement).files?.item(0);

      if(arquivo && arquivo.type.match(/image\/[\w]+/)){
        console.log(arquivo);
        this.imagem = arquivo; 
      }
    }
    catch(ex){
      console.log(ex);
    } 
  }


  submit(form: NgForm)
  {
    // let dados = new FormData();

    // dados.append('texto', form.value.texto)
    // dados.append('imagem', this.imagem as File)

    let dados = new UploadImagem();

    dados.imagem = this.imagem as File
    dados.texto = form.value.texto as string;

    console.log(dados);

    this.acService.pingImagem(dados).subscribe({
      next: this.submitNext,
      error: this.submitError
    });
  }


  submitNext = (res: Resposta<string>): void =>
  {
    console.log(res);
  }


  submitError = (res: HttpResponse<unknown>): void =>
  {
    console.log(res);
  }
}
