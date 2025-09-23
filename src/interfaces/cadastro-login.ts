export class LoginBody
{
    email: string | null = null;
    senha: string | null = null;

    static of(source: LoginBody): LoginBody
    {
        let res: LoginBody = new LoginBody();
        
        if(!source){
            console.warn("LoginBody.of: source was null");            
            return res;
        }

        Object.assign(res, source);
        return res;
    }
}