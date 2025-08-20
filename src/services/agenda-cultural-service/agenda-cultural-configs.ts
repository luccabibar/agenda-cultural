export abstract class Configs {
    static url = "127.0.0.1";
    static port = "8080";
    static endpoints = {
        evento:             ((id: number) => `/eventos/${ id }`),
        ping:               (() => `/ping`),
        buscarEventos:      (() => `/eventos`),
        getBuscarParams:    (() => `/eventos/filtros`),
    }
}