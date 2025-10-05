import { TipoUsuario } from "./tipo-usuario";

export class Usuario
{
    id: Number | null = null;
    email: string | null = null;
    nome: string | null = null;

    tipoUsuario: TipoUsuario | null = null;

    static of(source: Usuario): Usuario
    {
        let res: Usuario = new Usuario();
        
        if(!source){
            console.warn("Usuario.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}

export class Moderador extends Usuario
{
    cpf: string | null = null;

    
    static override of(source: Moderador): Moderador
    {
        let res: Moderador = new Moderador();
        
        if(!source){
            console.warn("Moderador.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}

export class Organizador extends Usuario
{
    cpf: string | null = null;

    
    static override of(source: Organizador): Organizador
    {
        let res: Organizador = new Organizador();
        
        if(!source){
            console.warn("Organizador.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}

export class Pessoa extends Usuario
{
    static override of(source: Pessoa): Pessoa
    {
        let res: Pessoa = new Pessoa();
        
        if(!source){
            console.warn("Pessoa.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}