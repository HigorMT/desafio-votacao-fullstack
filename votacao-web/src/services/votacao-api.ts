import {http} from '../utils/http';
import {Page} from '../model/page';
import {Votacao} from '../model/Votacao';

export class VotacaoApi {

    private static readonly URL: string = 'votacao'

    public static readonly create = async (payload: Votacao): Promise<Votacao> => {
        const response = await http.post(`${VotacaoApi.URL}`, JSON.stringify(payload));
        return response.data;
    }

    public static readonly createVote = async (idPauta?: number): Promise<Votacao> => {
        const response = await http.put(`${VotacaoApi.URL}/${idPauta}/create-voting`);
        return response.data;
    }

    public static readonly startingVote = async (id?: number): Promise<Votacao> => {
        const response = await http.put(`${VotacaoApi.URL}/${id}/start-voting`);
        return response.data;
    }

    public static readonly endVote = async (id?: number): Promise<Votacao> => {
        const response = await http.put(`${VotacaoApi.URL}/${id}/end-voting`);
        return response.data;
    }

    public static readonly cancelVote = async (id?: number): Promise<Votacao> => {
        const response = await http.put(`${VotacaoApi.URL}/${id}/cancel-voting`);
        return response.data;
    }

    public static readonly findById = async (id?: number): Promise<Votacao> => {
        const response = await http.get(`${VotacaoApi.URL}/${id}`);
        return response.data;
    }

    public static readonly pageable = async (filter: any): Promise<Page<Votacao>> => {
        const response = await http.get(`${VotacaoApi.URL}/pageable`, { params: filter });

        return response.data;
    }

}
