export default interface Usuario {
    id?: string;
    name: string;
    station: Station;
    username: string;
}

export interface Station {
    name: string;
    cnpj: string;
}
