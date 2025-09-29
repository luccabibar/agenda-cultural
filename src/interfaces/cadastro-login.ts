export class LoginBody
{
    email: string | null = null;
    senha: string | null = null;

    static of(source: LoginBody): LoginBody
    {
        let res: LoginBody = new LoginBody();
        
        if(!source){
            console.warn("LoginBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}


export class CadastroPessoaBody
{
    nome: string | null = null;
    email: string | null = null;
    senha: string | null = null;

    static of(source: CadastroPessoaBody): CadastroPessoaBody
    {
        let res: CadastroPessoaBody = new CadastroPessoaBody();
        
        if(!source){
            console.warn("CadastroPessoaBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}


export class CadastroOrganizadorBody
{
    cpf: string | null = null;

    static of(source: CadastroOrganizadorBody): CadastroOrganizadorBody
    {
        let res: CadastroOrganizadorBody = new CadastroOrganizadorBody();
        
        if(!source){
            console.warn("CadastroOrganizadorBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}