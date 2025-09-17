export class Resposta<T>
{
    response: T | null = null;


    static ofArray<V>(
        source: Resposta<V[]>, 
        classOfResponse?: { of(arg0: V): V }
    ): Resposta<V[]>
    {
        let res: Resposta<V[]> = new Resposta<V[]>();

        if(!source){
            console.warn("Resposta.of: source was null");            
            return res;
        }

        Object.assign(res, source);

        if(source.response && classOfResponse)
            res.response = source.response.map((elem: V) => classOfResponse.of(elem));

        return res;
    }

    static of<V>(
        source: Resposta<V>, 
        classOfResponse?: { of(arg0: V): V }
    ): Resposta<V>
    {
        let res: Resposta<V> = new Resposta<V>();

        if(!source){
            console.warn("Resposta.of: source was null");            
            return res;
        }

        Object.assign(res, source);

        if(source.response && classOfResponse)
            res.response = classOfResponse.of(source.response);
        
        return res;
    }
}