export class NovoEventoBody
{
    nome: string | null = null;
    descricao: string | null = null;
    categoria: string | null = null;
    contato: string | null = null;
    horaIni: string | null = null;
    horaFim: string | null = null;
    regiao: string | null = null;
    endereco: string | null = null;


    static of(source: NovoEventoBody): NovoEventoBody
    {
        let res: NovoEventoBody = new NovoEventoBody();
        
        if(!source){
            console.warn("NovoEventoBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}