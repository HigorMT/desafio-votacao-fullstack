import {VotoEnum} from './enum/VotoEnum';

export class Voto {

    id?: VotoId;
    decisao?: VotoEnum;

}

export class VotoId {
    cooperadoId?: number;
    votacaoId?: number
}
