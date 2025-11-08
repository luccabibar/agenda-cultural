import { ToFormDataInterface } from "../to-form-data";

export class EdicaoEventoBody implements ToFormDataInterface
{
    // membros podem ser undefined, deliberadamente
    descricao: string | undefined;
    contato: string | undefined;
    horaIni: string | undefined;
    horaFim: string | undefined;
    regiao: string | undefined;
    endereco: string | undefined;
    imagem: File | undefined


    static of(source: EdicaoEventoBody): EdicaoEventoBody
    {
        let res: EdicaoEventoBody = new EdicaoEventoBody();
        
        if(!source){
            console.warn("EdicaoEventoBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }

    toFormData(): FormData
    {
        let formData = new FormData();
        
        if(this.descricao)  formData.set('descricao', this.descricao)
        if(this.contato)  formData.set('contato', this.contato)
        if(this.horaIni)  formData.set('horaIni', this.horaIni)
        if(this.horaFim)  formData.set('horaFim', this.horaFim)
        if(this.regiao)  formData.set('regiao', this.regiao)
        if(this.endereco)  formData.set('endereco', this.endereco)
        if(this.imagem)  formData.set('imagem', this.imagem)

        return formData;
    }
}