
import {equal} from 'assert';

import {Methods} from '..';


export function run() {

    describe('Methods', () => {

        describe('.GET', () => {
            it('should be \'GET\'', () => equal(Methods.GET, 'GET'));
        });

        describe('.POST', () => {
            it('should be \'POST\'', () => equal(Methods.POST, 'POST'));
        });

        describe('.PUT', () => {
            it('should be \'PUT\'', () => equal(Methods.PUT, 'PUT'));
        });

        describe('.DELETE', () => {
            it('should be \'DELETE\'', () => equal(Methods.DELETE, 'DELETE'));
        });

    });

}

