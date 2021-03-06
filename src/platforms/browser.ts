
import {PlatformRequestConfig} from './request';
import {RequestPromise} from '../RequestPromise';


const UNSAFE_HEADERS = ['Connection', 'Content-Length'];

export = function(method: string, url: string, config: PlatformRequestConfig): RequestPromise<string> {

    let xhr = new XMLHttpRequest();
    let params = {req: xhr};

    return new RequestPromise((resolve, reject) => {

        xhr.open(method, url);

        //TODO: Abstract this part into a function of agama-types
        Object.keys(config.headers).forEach(k => {
            if(UNSAFE_HEADERS.indexOf(k) < 0) {
                xhr.setRequestHeader(k, config.headers[k]);
            }
        });

        xhr.onreadystatechange = () => {

            if(xhr.readyState !== 4 || xhr.status === 0) {
                return;
            }

            // if(xhr.status < 300) {
            //     return reject(new Error(`HttpError ${xhr.status}: ${xhr.statusText}`));
            // }


            let headers = xhr.getAllResponseHeaders().split('\r\n').reduce((obj, val) => {
                if(val){
                    let separatorIndex = val.indexOf(':');
                    let headerName = val.substr(0, separatorIndex).toLowerCase();

                    obj[headerName] = val.substr(separatorIndex + 1).trim();
                }
                return obj;
            },{});

            return resolve({
                status: xhr.status,
                statusText: xhr.statusText,
                data: xhr.responseText,
                headers: headers
            });
        };

        xhr.send(config.body);
    }, params);

};
