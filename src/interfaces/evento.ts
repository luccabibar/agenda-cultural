import { Configs } from "../services/agenda-cultural-service/agenda-cultural-configs";
import { Organizador, Moderador } from "./usuario/usuarios"; 

export class Evento 
{
    id: number | null = null;
    status: StatusEvento | null = null;
    
    nome: string | null = null;
    descricao: string | null = null;
    categoria: string | null = null;
    imagem: string | null = null;
    contato: string | null = null;

    organizador: Organizador | null = null;
    moderador: Moderador | null = null;
    
    horarioInicio: string | null = null;
    horarioFim: string | null = null;
    
    regiao: string | null = null;
    endereco: string | null = null;
    enderecoLink: string | null = null;
    
    atualizacoes: AtualizacaoEvento[] = [];

    public getEventoRoute(): string[]
    {
        if(this.id)
            return ['/evento', this.id.toString()];
        
        else
            return ['/home'];
    }
    
    // nao tenho capacidade de julgar se ha uma maneira melhor de fazer isso
    public getEventoImageUrl(): String
    {
        if(this.id)
           return `http://${ Configs.url }:${ Configs.port }${ Configs.endpoints.eventoImagem(this.id) }`;
        else
           return `http://${ Configs.url }:${ Configs.port }${ Configs.endpoints.eventoImagem(0) }`;
    }


    static of(source: Evento): Evento
    {
        let res: Evento = new Evento();

        if(!source){
            console.warn("Evento.of: source was null");            
            return res;
        }

        Object.assign(res, source);

        if(source.organizador)
            res.organizador = Organizador.of(source.organizador);

        if(source.moderador)
            res.moderador = Moderador.of(source.moderador);

        if(source.atualizacoes && source.atualizacoes.length > 0){
            res.atualizacoes = source.atualizacoes.map((att: AtualizacaoEvento) => AtualizacaoEvento.of(att));
        }

        return res;
    }
}


export enum StatusEvento
{
    EMANALISE="EMANALISE",
    APROVADO="APROVADO",
    REPROVADO="REPROVADO",
    CANCELADO="CANCELADO",
}


export namespace StatusEvento
{
    export function parse(val: string | null): StatusEvento | null
    {
        if(val && val in StatusEvento)
            return val as StatusEvento
        else
            return null
    }
}


export class AtualizacaoEvento
{
    id: number | null = null;
    
    titulo: string | null = null;
    texto: string | null = null;
    imagem: string | null = null;


    static of(source: AtualizacaoEvento): AtualizacaoEvento
    {
        let res: AtualizacaoEvento = new AtualizacaoEvento();

        if(!source){
            console.warn("AtualizacaoEvento.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}
