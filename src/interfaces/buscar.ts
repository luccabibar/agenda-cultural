import { StatusEvento } from "./evento";

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
    organizador: number | null = null;
    moderador: number | null = null;
    status: StatusEvento[] = [];


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


    isEmpty(): boolean
    {
        return ! (this.texto != null 
            || this.categoria != null
            || this.diaUpper != null
            || this.diaLower != null
            || this.horaUpper != null
            || this.horaLower != null
            || this.regiao != null
            || this.organizador != null
            || this.status.length > 0)
    }


    toObject(): { [key: string]: string | number | boolean | (string | number | boolean)[] }
    {
        let obj: { [key: string]: string | number | boolean | (string | number | boolean)[] } = {};

        for(let key in this)
            if(this[key])
                obj[key] = this[key] as string | number | boolean | (string | number | boolean)[];

        return obj;
    }
}