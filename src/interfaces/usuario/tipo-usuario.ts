export enum TipoUsuario
{
    PESSOA="PESSOA",
    ORGANIZADOR="ORGANIZADOR",
    MODERADOR="MODERADOR",
}


export namespace TipoUsuario
{
    export function parse(val: string | null): TipoUsuario | null
    {
        if(val && val in TipoUsuario)
            return val as TipoUsuario
        else
            return null
    }
}
