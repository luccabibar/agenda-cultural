
export interface Moderador extends Usuario
{
    cpf?: String
}

export interface Organizador extends Usuario
{
    cpf?: String
}

export interface Pessoa extends Usuario
{

}

interface Usuario
{
    id?: Number,
    email?: String,
    nome?: String
}