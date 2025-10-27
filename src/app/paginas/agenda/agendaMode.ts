export enum AgendaMode
{
  DIARIA='DIARIA',  
  SEMANAL='SEMANAL'    
}

export namespace AgendaMode
{
    export function parse(val: string | null): AgendaMode | null
    {
        if(val && val in AgendaMode)
            return val as AgendaMode
        else
            return null
    }
}