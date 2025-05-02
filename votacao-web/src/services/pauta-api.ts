import {http} from '../utils/http';
import {Pauta} from '../model/Pauta';
import {Page} from '../model/page';

export class PautaApi {

    private static readonly URL = 'pauta'
    
    public static readonly create = async (payload: Pauta): Promise<Pauta> => {
        const response = await http.post(`${PautaApi.URL}`, JSON.stringify(payload));
        return response.data;
    }

    public static readonly update = async (payload: Pauta, id: string): Promise<Pauta> => {
        const response = await http.put(`${PautaApi.URL}/${id}`, JSON.stringify(payload));
        return response.data;
    }

    public static readonly findById = async (id: number): Promise<Pauta> => {
        const response = await http.get(`${PautaApi.URL}/${id}`);
        return response.data;
    }

    public static readonly pageable = async (filter?: any): Promise<Page<Pauta>> => {
        const response = await http.get(`${PautaApi.URL}/pageable`, { params: filter });

        return response.data;
    }


}
