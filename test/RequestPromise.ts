
import {get} from '..';
import {deepEqual} from "assert";


export function run() {

    describe('RequestPromise', () => {

        it('cancel()', done => {

            let rp = get('https://www.google.cat');
            let response = null;
            rp.then(res => {
                response = res.data;
            });

            rp.cancel()
            deepEqual(null, response);
            done();
        });

    });

}

