
import {equal, deepEqual} from 'assert';

import {get, post} from '..';
import {QueryStringFormatter} from '../src';
import {JsonFormatter} from '../src/formatters/JsonFormatter';
import {testHeaders} from './util/TestHeaders';


describe('helpers', () => {

    describe('get()', () => {

        it('should return 200 http status code', done => {
            get('https://httpbin.org/status/200').then(() => done()).catch(err => done(err))
        });

        describe('user-agent', () => {

            let userAgent = 'AgamaBot';

            it('should have same user-agent', done => {
                get<string>('https://httpbin.org/user-agent', {userAgent: userAgent}).then(({data}) => {
                    let res = JSON.parse(data);
                    equal(res['user-agent'], userAgent);
                    done();
                }).catch(done);
            });

        });

        describe('query-string', () => {

            let query = {text: 'Hello World', num: 27};

            it('should have same query string', done => {
                get<string>('https://httpbin.org/get', {query: query}).then(({data}) => {
                    let res = JSON.parse(data);
                    deepEqual(res.args, query);
                    done();
                }).catch(done);
            });

        });

    });

    describe('post()', () => {

        describe('body', () => {

            it('text/plain body', done => {

                let data = 'Hello World';

                post<string>('https://httpbin.org/post', data).then(body => {
                    equal(JSON.parse(body.data).data, data);
                    done();
                }).catch(done);
            });

            it('application/x-www-form-urlencoded body', done => {

                let data = {text: 'Hello World', num: '27'};
                let config = {bodyFormatter: new QueryStringFormatter()};

                post<string>('https://httpbin.org/post', data, config).then(body => {
                    let res = JSON.parse(body.data);
                    deepEqual(res.form, data);
                    done();
                }).catch(done);
            });

            it('application/json body', done => {

                let data = {text: 'Hello World', num: '27'};
                let config = {bodyFormatter: new JsonFormatter()};

                post<string>('https://httpbin.org/post', data, config).then(body => {
                    let d = JSON.parse(body.data);
                    deepEqual(JSON.parse(d.data), data);
                    done();
                }).catch(done);
            });

        });

    });

    describe('headers', () => {


        it('httpbin.org/get', done => {

            let url = 'https://httpbin.org/get';
            let configHeaders = {
                match: {
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Origin': '*',
                    'Connection': 'close',
                    'Content-Type': 'application/json',
                    'Server': 'meinheld/0.6.1',
                    'Via': '1.1 vegur',
                    'X-Powered-By': 'Flask',
                }, exist: {
                    'Content-Length': '501',
                    'Date': 'Thu, 23 Nov 2017 17:32:18 GMT',
                    'X-Processed-Time': '0.000707149505615'
                }
            };

            testHeaders(url, configHeaders).then(done).catch(done);

        });

        it('wwww.google.es', done => {

            let url = 'https://www.google.es/';

            let configHeaders = {
                match: {
                    'alt-svc': 'hq=":443"; ma=2592000; quic=51303431; quic=51303339; quic=51303338; quic=51303337; quic=51303335,quic=":443"; ma=2592000; v="41,39,38,37,35"',
                    'cache-control': 'private, max-age=0',
                    // 'content-encoding': 'br',
                    'content-type': 'text/html; charset=ISO-8859-1',
                    expires: '-1',
                    server: 'gws',
                    // 'strict-transport-security': 'max-age=3600',
                    // 'X-Firefox-Spdy': 'h2',
                    'x-frame-options': 'SAMEORIGIN',
                    'x-xss-protection': '1; mode=block'
                }, exist: {
                    date: 'Thu, 23 Nov 2017 18:20:42 GMT',
                }
            };

            testHeaders(url, configHeaders).then(done).catch(done);

        });


        // describe('www.google.es', () => {
        //
        //     it('headers should match firefox headers', done => {
        //
        //         let firefoxHeaders = {
        //             'Access-Control-Allow-Credentials': 'true',
        //             'Access-Control-Allow-Origin': '*',
        //             'Connection': 'close',
        //             'Content-Type': 'application/json',
        //             'Server': 'meinheld/0.6.1',
        //             'Via': '1.1 vegur',
        //             'X-Powered-By': 'Flask',
        //         };
        //
        //         get<string>('https://www.google.es',).then((res) => {
        //             let headers = Object.keys(firefoxHeaders);
        //
        //             headers.forEach(val => {
        //                 deepEqual(
        //                     res.headers[val.toLowerCase()],
        //                     firefoxHeaders[val]
        //                 );
        //             });
        //
        //             done();
        //         }).catch(done);
        //     });
        //
        //     it('headers should at least exist on response', done => {
        //
        //         let firefoxHeaders = {
        //             'Content-Length': '501',
        //             'Date': 'Thu, 23 Nov 2017 17:32:18 GMT',
        //             'X-Processed-Time': '0.000707149505615'
        //         };
        //
        //         get<string>('https://www.google.es',).then((res) => {
        //             let headers = Object.keys(firefoxHeaders);
        //
        //             headers.forEach(val => {
        //                 deepEqual(
        //                     !!res.headers[val.toLowerCase()],
        //                     true
        //                 );
        //             });
        //
        //             done();
        //         }).catch(done);
        //     });

        // });

    });

});
