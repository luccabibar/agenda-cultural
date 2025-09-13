
class Usuario
{
    id: Number | null = null;
    email: String | null = null;
    nome: String | null = null;
}

export class Moderador extends Usuario
{
    cpf: String | null = null;
}

export class Organizador extends Usuario
{
    cpf: String | null = null;
}

export class Pessoa extends Usuario
{

}