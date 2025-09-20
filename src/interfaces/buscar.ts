
export class BuscarParams
{
    regioes: string[] = [];
    categorias: string[] = [];


    static of(source: BuscarParams): BuscarParams
    {
        let res: BuscarParams = new BuscarParams();
        
        if(!source){
            console.warn("BuscarParams.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}

export class BuscarDados
{
    texto: string | null = null;
    categoria: string | null = null;
    diaUpper: string | null = null;
    diaLower: string | null = null;
    horaUpper: string | null = null;
    horaLower: string | null = null;
    regiao: string | null = null;


    static of(source: BuscarDados): BuscarDados
    {
        let res: BuscarDados = new BuscarDados();
        
        if(!source){
            console.warn("BuscarDados.of: source was null");            
            return res;
        }

        Object.assign(res, source);       

        return res;
    }
}