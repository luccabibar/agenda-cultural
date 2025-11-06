import { ToFormDataInterface } from "./to-form-data";

export class UploadImagem implements ToFormDataInterface
{
    texto: string | null = null;
    imagem: File | null = null;

    static of(source: UploadImagem): UploadImagem
    {
        let res: UploadImagem = new UploadImagem();
        
        if(!source){
            console.warn("UploadImagem.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }


    toFormData(): FormData
    {
        let formData = new FormData();
        
        if(this.texto) formData.set('texto', this.texto);
        if(this.imagem) formData.set('imagem', this.imagem, this.imagem.name);

        return formData;
    }
}