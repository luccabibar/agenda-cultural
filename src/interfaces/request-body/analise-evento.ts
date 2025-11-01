import { StatusEvento } from "../evento";

export class AnaliseEventoBody
{
    status: StatusEvento.APROVADO | StatusEvento.REPROVADO | null = null; 
}