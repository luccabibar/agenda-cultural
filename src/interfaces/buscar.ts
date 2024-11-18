
export interface BuscarParams {
    regioes: string[]
    categorias: string[]
}

export interface BuscarDados {
    'texto': string | null
    'categoria': string | null
    'diaUpper': string | null
    'diaLower': string | null
    'horaUpper': string | null
    'horaLower': string | null
    'regiao': string | null
}