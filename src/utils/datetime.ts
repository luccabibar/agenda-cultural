import { formatDate } from "@angular/common";

export class DatetimeUtil
{
    static dateString: string = "YYYY-MM-dd";
    static timeString: string = "HH:mm:ss";
    static dateTimeString: string = this.dateString + "T" + this.timeString;


    static timeToISO(str: string): string
    {
        if(str.match(/^(\d{4}-\d{2}-\d{2}T)?([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g))
            return (str);

        else if(str.match(/^(\d{4}-\d{2}-\d{2}T)?([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g))
            return (str + ':00');

        else if(str.match(/^(\d{4}-\d{2}-\d{2}T)?([0-1]?[0-9]|2[0-3])$/g))
            return (str + ':00:00');

        else
            return "";
    }


    static isDateTimeValid(str: string, strictTime: boolean = false)
    {
        if(!str)
            return false;

        //yyyy-MM-ddThh:mm:ss
        let dt: string[] = str.split('T');

        if(dt.length == 2 && this.isDateValid(dt[0]) && this.isTimeValid(dt[1], strictTime))
            return true;
        else
            return false;
    }



    static isDateValid(str: string): boolean
    {
        if(!str)
            return false;

        // yyyy-mm-dd com restricoes 
        if(str.match(/^\d{4}-(1[0-2]|0\d)-(3[0-1]|[0-2]\d)$/g) != null){
            let ymd: number[] = str.split('-').map(Number);

            let ehMultiplo = (xx: number, yy: number):boolean => xx % yy == 0;
            // https://www.folhape.com.br/noticias/por-que-1900-e-2100-nao-sao-anos-bissextos/131771/
            let bissexto: boolean = (ehMultiplo(ymd[0], 4) && (!ehMultiplo(ymd[0], 100) || ehMultiplo(ymd[0], 400)))
        
            // jan, mar, mai, jul, ago, out, dez => 31 dias
            if ([1, 3, 5, 7, 8, 10, 12].includes(ymd[1])){
                if(ymd[2] > 31)
                    return false
            }
            // abr, jun, set, nov
            else if([4, 6, 9, 11].includes(ymd[1])){
                if(ymd[2] > 30)
                    return false;
            }
            // fev => 28 (+ 1/4) dias
            else if(ymd[1] == 2){
                if(ymd[2] > 28 || (bissexto && ymd[2] > 29))
                    return false
            }
            // nao mes???
            else{
                return false
            }
        }
        else{
            return false;
        }

        return true;
    }


    static isTimeValid(str: string, strict: boolean = false): boolean
    {
        if(!str)
            return false;

        if(strict)
            return str.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g) != null;
        else
            return str.match(/^([0-1]?[0-9]|2[0-3])((:[0-5][0-9])?:[0-5][0-9])?$/g) != null;
    }


    static compareDate(aa: string, bb: string): number
    {
        if(!this.isDateValid(aa) || !this.isDateValid(bb))
            return NaN;

        let da: Date = new Date(aa);
        let db: Date = new Date(bb);

        if(da < db)
            return -1;
        else if (da > db)
            return 1;
        else 
            return 0;
    }


    static compareDateTime(aa: string, bb: string): number
    {
        if(!this.isDateTimeValid(aa) || !this.isDateTimeValid(bb))
            return NaN;

        let da: Date = new Date(aa);
        let db: Date = new Date(bb);

        if(da < db)
            return -1;
        else if (da > db)
            return 1;
        else 
            return 0;
    }


    static agora(): string
    {
        return formatDate(Date.now(), this.dateTimeString, "en_US");
    }


    static dateToISODateTime(date: Date): string
    {
        return formatDate(date, this.dateTimeString, "en_US");
    }

    
    static dateToISODate(date: Date): string
    {
        return formatDate(date, this.dateString, "en_US");
    }

    
    static dateToISOTime(date: Date): string
    {
        return formatDate(date, this.timeString, "en_US");
    }


    static toDate(str: string): Date | null
    {
        return new Date(Date.parse(str));
    }
}


// export class Time
// {
//     private hour: number = 0;
//     private minute: number = 0;
//     private second: number = 0;

//     constructor(hr?: number, mn?: number, sc?: number)
//     {
//         if(hr) this.setHour(hr)
//         if(mn) this.setMinute(mn)
//         if(sc) this.setSecond(sc)
//     }

//     public setHour(hr: number): Time 
//     { 
//         if(hr && hr >= 0 && hr <= 23) 
//             this.hour = hr;
//         else
//             throw new Error("Time.setHour: invalid value for hour");  

//         return this;
//     }

//     public setMinute(mn: number): Time 
//     { 
//         if(mn && mn >= 0 && mn <= 59) 
//             this.minute = mn;
//         else
//             throw new Error("Time.setMinute: invalid value for minute"); 

//         return this;
//     }

//     public setSecond(sc: number): Time 
//     { 
//         if(sc && sc >= 0 && sc <= 59) 
//             this.second = sc;
//         else
//             throw new Error("Time.setSecond: invalid value for second"); 

//         return this;
//     }

//     public getHour(): number { return this.hour; }
//     public getMinute(): number { return this.minute; }
//     public getSecond(): number { return this.second; }
// }