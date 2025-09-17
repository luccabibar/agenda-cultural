import { Organizador, Moderador } from "./usuarios"; 

export class Evento 
{
    id: Number | null = null;
    status: StatusEvento | null = null;
    
    nome: string | null = null;
    descricao: string | null = null;
    categoria: string | null = null;
    imagem: string | null = null;
    contato: string | null = null;

    organizador: Organizador | null = null;
    moderador: Moderador | null = null;
    
    horarioInicio: Date | null = null;
    horarioFim: Date | null = null;
    
    regiao: string | null = null;
    endereco: string | null = null;
    enderecoLink: string | null = null;
    
    atualizacoes: AtualizacaoEvento[] = [];

    public getEventoResource(): string
    {
        // TODO: pegar dinamicamente endereco
        return `http://localhost:4200/evento/${this.id}`;
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
    EmAnalise,
    Aprovado,
    Reprovado,
    Cancelado
}

export class AtualizacaoEvento
{
    id: Number | null = null;
    
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
