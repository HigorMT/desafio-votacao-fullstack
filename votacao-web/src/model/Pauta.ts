import {StatusPautaEnum} from './enum/StatusPautaEnum';

export class Pauta {
    id?: number;
    nome?: string;
    duracao?: string;
    descricao?: string;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    status?: StatusPautaEnum = StatusPautaEnum.NOVA;
}
