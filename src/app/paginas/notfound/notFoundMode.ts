export enum NotFoundMode
{
    DEFAULT="DEFAULT",
    EVENTO="EVENTO",
    LOGINCADASTRO="LOGINCADASTRO",
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
