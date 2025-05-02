import {http} from '../utils/http';
import {ContabilizacaoVoto} from '../model/ContabilizacaoVoto';
import {Voto} from '../model/Voto';

export class VotoApi {

    private static readonly URL: string = 'votacao/voto'

    public static readonly vote = async (payload: Voto): Promise<Voto> => {
        const response = await http.post(`${VotoApi.URL}`, JSON.stringify(payload));
        return response.data;
    }

    public static readonly countingVote = async (votacaoId?: number): Promise<ContabilizacaoVoto> => {
        const response = await http.get(`${VotoApi.URL}/${votacaoId}/counting`);
        return response.data;
    }

}
