export class DatetimeUtil
{
    static formatTime(str: string): string
    {
        if(str.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/g))
            return (str);

        else if(str.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g))
            return (str + ':00');

        else if(str.match(/^([0-1]?[0-9]|2[0-3])$/g))
            return (str + ':00:00');

        else
            return "";
    }
}