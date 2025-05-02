import axios, {AxiosInstance} from 'axios';

export const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/votacao-core/',
    headers: {
        "Content-Type": "application/json",
    }
});

