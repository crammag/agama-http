
import {Config} from './Config';
import {Methods} from './Methods';
import {platformRequest, getPlatformRequest, PlatformRequestConfig} from './platforms/request';


const req: platformRequest = getPlatformRequest();


export function get<T>(url: string, config?: Config): Promise<T> {
    return request(Methods.GET, url, config);
}

export function post<T>(url: string, data?: Object, config?: Config): Promise<T> {
    return request(Methods.POST, url, data, config);
}

export function put<T>(url: string, data?: Object, config?: Config): Promise<T> {
    return request(Methods.PUT, url, data, config);
}

export function del<T>(url: string, config?: Config): Promise<T> {
    return request(Methods.DELETE, url, config);
}

export function request<T>(method: string, url: string, data?: Object, config: Config = {}): Promise<T> {

    //TODO: Preparar query string de data y config
    //TODO: Preparar body de data y config con adapter
    //TODO: Preparar params de url (a lo route params de express o sentencias preparadas de SQL)

    let cfg: PlatformRequestConfig = {
        headers: config.headers || {}
    };

    if(config.body) {
        cfg.body = config.body;
    }

    //TODO: Usar adapter
    return req<T>(method, url, cfg).then(res => res.data);
}
