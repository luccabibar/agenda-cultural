export class ckeckCpfCnpj
{
    public static limpaCpfCnpj(str: string): string
    {
        return str.replaceAll(/\D/g, "");
    }



    public static isCpfValid(cpf: string): boolean
    {
        // limpeza da string
        cpf = this.limpaCpfCnpj(cpf);

        console.log(cpf);
        

        const size: number = 11;

        // formato
        if (cpf.length != size || !cpf.match(/[\d]+/))
            return false;
        
        // string -> array
        let digitos: number[];

        digitos = cpf.split('').map(Number); // chique

        // checksum
        let ca, cb: number;
        let sum: number = 0;

        // digito verif 1
        for(let ii = 0, ww = 10; ii != 9; ii++, ww--)
            sum += digitos[ii] * ww;

        ca = 11 - (sum % 11);
        ca = (ca > 9) ? 0 : ca;

        // digito verif 2
        sum = 0;
        for(let ii = 0, ww = 11; ii != 10; ii++, ww--)
            sum += digitos[ii] * ww;

        cb = 11 - (sum % 11);
        cb = (cb > 9) ? 0 : cb;
        
        // check
        if(ca != digitos[9] || cb != digitos[10])
            return false;

        return true;
    }


    public static isCnpjValid(cnpj: string): boolean
    {
        // limpeza da string
        cnpj = this.limpaCpfCnpj(cnpj);
        const size: number = 14;

        // formato
        if (cnpj.length != size || !cnpj.match(/[\d]+/))
            return false;
        
        // string -> array
        let digitos: number[];

        digitos = cnpj.split('').map(Number); // chique

        // checksum
        let ca: number, cb: number;
        let sum: number = 0;
        
        // digito verif 1
        let pesos: number[] = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ];

        for(let ii = 0; ii != 12; ii++)
            sum += digitos[ii] * pesos[ii + 1]; // <- IMPORTANTE usar pesos com offset 1 para primero digito 

        ca = 11 - (sum % 11);
        ca = (ca > 9) ? 0 : ca;

        // digito verif 2
        sum = 0;
        
        for(let ii = 0; ii != 13; ii++)
            sum += digitos[ii] * pesos[ii + 0];

        cb = 11 - (sum % 11);
        cb = (cb > 9) ? 0 : cb;
        
        // check
        if(ca != digitos[12] || cb != digitos[13])
            return false;

        return true;
    }


    public static isCpfCnpjValid(str: string): boolean
    {
        return this.isCpfValid(str) || this.isCnpjValid(str);
    }
}