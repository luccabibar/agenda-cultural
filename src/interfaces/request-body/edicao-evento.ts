export class EdicaoEventoBody
{
    // membros podem ser undefined, deliberadamente
    descricao: string | undefined;
    contato: string | undefined;
    horaIni: string | undefined;
    horaFim: string | undefined;
    regiao: string | undefined;
    endereco: string | undefined;


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