import { BuscarParams } from "../../../interfaces/buscar";
import { DatetimeUtil } from "../../../utils/datetime";

export class EventoValidation
{
  public static isEventoValid(dadosEvento: { [key: string]: any }, imagem: File | null, dadosDropdown: BuscarParams): [boolean, string] 
  {
    try{
      // nome
      let nome: string = dadosEvento['nome'];
      if(nome.length < 4)   return [false, "Nome do evento deve ter, ao menos, 5 caracteres"];
      if(nome.length > 24)  return [false, "Nome do evento deve ter, no máximo, 24 caracteres"];
        
      // descricao
      let descricao: string = dadosEvento['descricao'];
      if((descricao as string).length <= 0)   return [false, "Descrição do evento não deve ser vazia"];
      if((descricao as string).length > 256)  return [false, "Descrição do evento deve ter, no máximo, 256 caracteres"];
        
      // descricao
      let categoria: string = dadosEvento['categoria'];
      if(!(dadosDropdown.categorias.includes(categoria)))  return [false, "Uma Categoria deve ser selecionada"];

      // contato
      let contato: string = dadosEvento['contato'];
      if(contato.length <= 0)  return [false, "Contato do evento não deve ser vazio"];
      if(contato.length > 32)  return [false, "Contato do evento deve ter, no máximo, 24 caracteres"];

      // horario
      let horaIni: string = dadosEvento['horaIni'];
      if (!DatetimeUtil.isDateTimeValid(horaIni)) return [false, "Data/Horário de início do evento é inválido"];
      
      let horaFim: string = dadosEvento['horaFim'];
      if (!DatetimeUtil.isDateTimeValid(horaFim)) return [false, "Data/Horário de fim do evento é inválido"];
      
      let cmpIniFim: number = DatetimeUtil.compareDateTime(horaIni, horaFim); 
      let cmpIniNow: number = DatetimeUtil.compareDateTime(horaIni, DatetimeUtil.agora()); 
      if (isNaN(cmpIniFim) || isNaN(cmpIniFim)) return [false, "Erro inesperado ao validar valor dos Horários"];
      if (cmpIniFim >= 0)                       return [false, "O início do evento não pode ser agendado para depois de seu fim"];
      if (cmpIniNow <= 0)                       return [false, "O início do evento não pode ser agendado para uma data que já passada"];
      
      // regiao
      let regiao: string = dadosEvento['regiao'];
      if (!(dadosDropdown.regioes.includes(regiao)))  return [false, "Uma região deve ser selecionada"];

      // endereco
      let endereco = dadosEvento['endereco'];
      if(endereco.length <= 0)  return [false, "Endereco do evento não deve ser vazio"];
      if(endereco.length > 64)  return [false, "Endereco do evento deve ter, no máximo, 64 caracteres"]; 

      // imagem
      if(imagem == null || imagem.size <= 0)                  return [false, 'A imagem não deve ser vazia'];
      if(imagem.size > 1 * 1000 * 1000)                       return [false, 'A imagem deve ter, no máximo, 1Mb'];
      if(!['image/png', 'image/jpeg'].includes(imagem.type))  return [false, 'A imagem deve ser um arquivo tipo PNG ou JPEG'];
    }
    catch(ex: any)  {
      return [false, "EventoValidation: erro inesperado ao validar dados do form: " + ex];
    }
    

    return [true, ":D"];
  }
}