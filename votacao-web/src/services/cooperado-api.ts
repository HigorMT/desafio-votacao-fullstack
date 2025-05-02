import {http} from '../utils/http';
import {Cooperado} from '../model/Cooperado';
import {ValidacaoCooperadoVoto} from '../model/ValidacaoCooperadoVoto';

export class CooperadoApi {

    private static readonly URL = 'cooperado'

    public static readonly findById = async (id: number): Promise<Cooperado> => {
        const response = await http.get(`${CooperadoApi.URL}/${id}`);
        return response.data;
    }

    public static readonly findByCpf = async (cpf?: string): Promise<Cooperado> => {
        const response = await http.get(`${CooperadoApi.URL}/cpf?cpf=${cpf}`);
        return response.data;
    }

    public static readonly validatingVote = async (cpf: string): Promise<ValidacaoCooperadoVoto> => {
        const response = await http.get(`${CooperadoApi.URL}/validate-vote?cpf=${cpf}`);
        return response.data;
    }

}
