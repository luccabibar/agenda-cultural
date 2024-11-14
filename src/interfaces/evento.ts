import { Organizador, Moderador } from "./usuarios"; 

export interface Evento 
{
    id?: Number
    status?: StatusEvento,
    
    nome?: String,
    descricao?: String,
    categoria?: String,
    imagem?: String,
    contato?: String,

    organizador?: Organizador,
    moderador?: Moderador,
    
    data?: Date,
    horarioInicio?: Date,
    horarioFim?: Date,
    
    regiao?: String,
    endereco?: String,
    enderecoLink?: String
    
    atualizacoes?: AtualizacaoEvento[]
}

export enum StatusEvento
{
    EmAnalise,
    Aprovado,
    Reprovado,
    Cancelado
}

export interface AtualizacaoEvento
{
    id?: Number
    
    titulo?: String,
    texto?: String,
    imagem?: String
}
