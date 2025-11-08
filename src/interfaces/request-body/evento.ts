import { ToFormDataInterface } from "../to-form-data";

export class NovoEventoBody implements ToFormDataInterface
{
    nome: string | null = null;
    descricao: string | null = null;
    categoria: string | null = null;
    contato: string | null = null;
    horaIni: string | null = null;
    horaFim: string | null = null;
    regiao: string | null = null;
    endereco: string | null = null;
    imagem: File | null = null;


    static of(source: NovoEventoBody): NovoEventoBody
    {
        let res: NovoEventoBody = new NovoEventoBody();
        
        if(!source){
            console.warn("NovoEventoBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }

    toFormData(): FormData
    {
        let formData = new FormData();

        if(this.nome)  formData.set('nome', this.nome);
        if(this.descricao)  formData.set('descricao', this.descricao);
        if(this.categoria)  formData.set('categoria', this.categoria);
        if(this.contato)  formData.set('contato', this.contato);
        if(this.horaIni)  formData.set('horaIni', this.horaIni);
        if(this.horaFim)  formData.set('horaFim', this.horaFim);
        if(this.regiao)  formData.set('regiao', this.regiao);
        if(this.endereco)  formData.set('endereco', this.endereco);
        if(this.imagem)  formData.set('imagem', this.imagem, this.imagem.name);

        return formData;
    }
}