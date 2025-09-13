
export class BuscarParams {
    regioes: string[] = [];
    categorias: string[] = [];
}

export class BuscarDados {
    texto: string | null = null;
    categoria: string | null = null;
    diaUpper: string | null = null;
    diaLower: string | null = null;
    horaUpper: string | null = null;
    horaLower: string | null = null;
    regiao: string | null = null;
}