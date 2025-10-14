export class AtualizacaoValidation
{
  public static isAtualizacaoValid(dadosAtt: { [key: string]: any }): [boolean, string] 
  {
    try{
      // titulo
      let titulo: string = dadosAtt['titulo'];
      if(titulo.length <= 0)   return [false, "Titulo da atualização não deve ser vazia"];
      if(titulo.length > 24)  return [false, "Titulo da atualização deve ter, no máximo, 24 caracteres"];
        
      // texto
      let texto: string = dadosAtt['texto'];
      if((texto as string).length <= 0)   return [false, "Texto da atualização não deve ser vazia"];
      if((texto as string).length > 256)  return [false, "Texto da atualização deve ter, no máximo, 256 caracteres"];
    }
    catch(ex: any)  {
      return [false, "NovoEventoComponent: erro inesperado ao validar dados do form: " + ex];
    }
    
    return [true, ":D"];
  }
}