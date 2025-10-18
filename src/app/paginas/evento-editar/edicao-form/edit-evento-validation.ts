import { BuscarParams } from "../../../../interfaces/buscar";
import { Evento } from "../../../../interfaces/evento";
import { DatetimeUtil } from "../../../../utils/datetime";

// TODO: mergear com EventoValidation?????????????? ?
export class EditEventoValidation
{
  public static isEditValid(
    dadosEdit: { [key: string]: any }, 
    dadosEvento: Evento, 
    dadosDropdown: BuscarParams
  ): [boolean, string] {

    // este metodo deliberadamente permite que alguns (mas nao todos) valores possam ser undefined, mas caso nao sejam, devem ser validos
    
    if(Object.keys(dadosEdit).length == 0)
        return [false, "Nenhum campo foi editado"];
    
    try{
      // descricao
      if(dadosEdit['descricao']){
        let descricao: string = dadosEdit['descricao'];
        if((descricao as string).length <= 0)   return [false, "Descrição do evento não deve ser vazia"];
        if((descricao as string).length > 256)  return [false, "Descrição do evento deve ter, no máximo, 256 caracteres"];
      }
  
      // contato
      if(dadosEdit['contato']){
        let contato: string = dadosEdit['contato'];
        if(contato.length <= 0)  return [false, "Contato do evento não deve ser vazio"];
        if(contato.length > 32)  return [false, "Contato do evento deve ter, no máximo, 24 caracteres"];
      }

      // horario
      let horaIni: string = (dadosEdit['horaIni']) ? dadosEdit['horaIni'] : dadosEvento.horarioInicio; // usa valor ja existente no evento se nao foi definido um novo
      if (!DatetimeUtil.isDateTimeValid(horaIni)) return [false, "Data/Horário de início do evento é inválido"];
      
      let horaFim: string = (dadosEdit['horaFim']) ? dadosEdit['horaFim'] : dadosEvento.horarioFim; // usa valor ja existente no evento se nao foi definido um novo
      if (!DatetimeUtil.isDateTimeValid(horaFim)) return [false, "Data/Horário de fim do evento é inválido"];

      let cmpIniFim: number = DatetimeUtil.compareDateTime(horaIni, horaFim); 
      let cmpIniNow: number = DatetimeUtil.compareDateTime(horaIni, DatetimeUtil.agora()); 
      if (isNaN(cmpIniFim) || isNaN(cmpIniFim)) return [false, "Erro inesperado ao validar valor dos Horáirios"];
      if (cmpIniFim >= 0)                       return [false, "O início do evento não pode ser agendado para depois de seu fim"];
      if (cmpIniNow <= 0)                       return [false, "O início do evento não pode ser agendado para uma data que já passada"];
      
      // regiao
      if(dadosEdit['regiao']){
        let regiao: string = dadosEdit['regiao'];
        if (!(dadosDropdown.regioes.includes(regiao)))  return [false, "Uma região deve ser selecionada"];
      }

      // endereco
      if(dadosEdit['endereco']){
        let endereco = dadosEdit['endereco'];
        if(endereco.length <= 0)  return [false, "Endereco do evento não deve ser vazio"];
        if(endereco.length > 64)  return [false, "Endereco do evento deve ter, no máximo, 64 caracteres"]; 
      }
    }
    catch(ex: any)  {
      return [false, "EventoValidation: erro inesperado ao validar dados do form: " + ex];
    }
    

    return [true, ":D"];
  }
}