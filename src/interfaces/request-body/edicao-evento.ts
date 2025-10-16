export class EdicaoEventoBody
{
    descricao: string | null = null;
    contato: string | null = null;
    horaIni: string | null = null;
    horaFim: string | null = null;
    regiao: string | null = null;
    endereco: string | null = null;


    static of(source: EdicaoEventoBody): EdicaoEventoBody
    {
        let res: EdicaoEventoBody = new EdicaoEventoBody();
        
        if(!source){
            console.warn("EdicaoEventoBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}