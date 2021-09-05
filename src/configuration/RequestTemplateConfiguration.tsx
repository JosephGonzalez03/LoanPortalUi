import configuraton from "../resources/application.json";

const {Url, SearchParams} = require('url');

type HttpProperties = {
    protocol: string;
    host: string;
    port: string;
    basePath: string;
}

export function apiRequestTemplate(httpProperties: HttpProperties, uri: string, params?: Record<string, string>): Promise<Response> {
    let url = new Url (httpProperties.protocol + 
                    "://" + 
                    httpProperties.host + 
                    ":" + 
                    httpProperties.port +
                    httpProperties.basePath);

    url.search = new URLSearchParams(params).toString();
    console.log(url)
    return fetch(url);
}

export function loanSystemApiProperties(): HttpProperties {
   let loanSystemApi: HttpProperties = configuraton.providers["loan-system-api"]["mock"];
   return loanSystemApi;
}
