
import {AssignableObject} from './__lib__/@agama/types';


export interface Response<T> {

    status: number;
    statusText: string;
    headers: AssignableObject<any>;
    data: T;

}
