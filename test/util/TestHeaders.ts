
import {deepEqual} from 'assert';

import {AssignableObject} from '../../src/__lib__/@agama/types/AssignableObject';
import {get} from '../../src/helpers';


export interface HeadersConfig {
    match: AssignableObject<any>;
    exist: AssignableObject<any>;
}

export function testHeaders(url: string, config: HeadersConfig): Promise<void> {

    return get(url).then(res => {

        let matchHeaders = Object.keys(config.match);
        let existHeaders = Object.keys(config.exist);

        matchHeaders.forEach(val => {
            deepEqual(
                res.headers[val.toLowerCase()],
                config.match[val]
            );
        });

        existHeaders.forEach(val => {
            deepEqual(
                !!res.headers[val.toLowerCase()],
                true
            );
        });
    });

}
