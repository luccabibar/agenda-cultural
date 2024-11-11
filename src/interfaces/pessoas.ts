
export interface Moderador extends Pessoa
{
    cpf: String
}

export interface Organizador extends Pessoa
{
    cpf: String
}

export interface Usuario extends Pessoa
{

}

interface Pessoa
{
    id: Number
    email: String
}