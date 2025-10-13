export class NovaAtualizacaoBody
{
    titulo: string | null = null;
    texto: string | null = null;


    static of(source: NovaAtualizacaoBody): NovaAtualizacaoBody
    {
        let res: NovaAtualizacaoBody = new NovaAtualizacaoBody();
        
        if(!source){
            console.warn("NovaAtualizacaoBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}