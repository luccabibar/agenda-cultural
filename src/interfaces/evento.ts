import { Organizador, Moderador } from "./usuarios"; 

export class Evento 
{
    id: Number | null = null;
    status: StatusEvento | null = null;
    
    nome: String | null = null;
    descricao: String | null = null;
    categoria: String | null = null;
    imagem: String | null = null;
    contato: String | null = null;

    organizador: Organizador | null = null;
    moderador: Moderador | null = null;
    
    horarioInicio: Date | null = null;
    horarioFim: Date | null = null;
    
    regiao: String | null = null;
    endereco: String | null = null;
    enderecoLink: String | null = null;
    
    atualizacoes: AtualizacaoEvento[] = [];

    public getEventoResource(): string
    {
        // TODO: pegar dinamicamente endereco
        return `http://localhost:4200/evento/${this.id}`;
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
    
    titulo: String | null = null;
    texto: String | null = null;
    imagem: String | null = null;
}
