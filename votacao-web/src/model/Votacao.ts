import {Pauta} from './Pauta';
import {StatusVotacaoEnum} from './enum/StatusVotacaoEnum';

export class Votacao {

    id?: number;
    pauta?: Pauta;
    dataFim?: Date
    dataInicio?: Date
    dataCriacao?: Date;
    dataAtualizacao?: Date
    duracaoVotacao?: string;
    duracaoSegundos?: number;
    status?: StatusVotacaoEnum;

}
