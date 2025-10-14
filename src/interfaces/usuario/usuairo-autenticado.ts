import { Usuario } from "./usuarios";

export class UsuarioAutenticado
{
    usuario: Usuario | null = null;
    authToken: string | null = null;


    static isValid(obj: unknown): boolean
    {
        return obj && obj instanceof UsuarioAutenticado && obj.usuario && obj.authToken ?  true : false
    }


    static of(source: UsuarioAutenticado): UsuarioAutenticado
    {
        let res: UsuarioAutenticado = new UsuarioAutenticado();
        
        if(!source){
            console.warn("UsuarioAutenticado.of: source was null");            
            return res;
        }

        Object.assign(res, source);

        if(source.usuario)
            res.usuario = Usuario.of(source.usuario);

        return res;
    }
}