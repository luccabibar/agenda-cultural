export enum NotFoundMode
{
    DEFAULT="DEFAULT",
    EVENTO="EVENTO",
    LOGIN="LOGIN",
    AUTHORGANIZADOR="AUTHORGANIZADOR",
    AUTHMODERADOR="AUTHMODERADOR",
}


export namespace NotFoundMode
{
    export function parse(val: string | null): NotFoundMode | null
    {
        if(val && val in NotFoundMode)
            return val as NotFoundMode
        else
            return null
    }
}
