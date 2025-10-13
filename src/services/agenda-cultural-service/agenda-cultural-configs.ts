export abstract class Configs {
    static url = "127.0.0.1";
    static port = "8080";
    static endpoints = {
        ping:               (() => `/ping`),
        eventos:            (() => `/eventos`),
        eventosFiltros:     (() => `/eventos/filtros`),
        eventoById:         ((id: number) => `/eventos/${ id }`),
        eventoAtualizacao:  ((id: number) => `/eventos/${ id }/atualizacoes`),
        usuarioSelf:        (() => `/usuarios/self`),
        login:              (() => `/usuarios/login`),
        organizador:        (() => `/usuarios/organizadores`),
        pessoa:             (() => `/usuarios/pessoas`),
    }
}