import configuraton from "../resources/application.json";
import axios, {AxiosInstance} from 'axios';

type HttpProperties = {
    protocol: string;
    host: string;
    port: string;
    basePath: string;
}

function getUrl(httpProperties: HttpProperties): string {
    return httpProperties.protocol + 
            "://" + 
            httpProperties.host + 
            ":" + 
            httpProperties.port +
            httpProperties.basePath;
}

export const loanSystemApi: AxiosInstance = axios.create({
    baseURL: getUrl(configuraton.providers["loan-system-api"]["mock"])
});
