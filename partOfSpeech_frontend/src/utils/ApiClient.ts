import axios from 'axios'
import { IRequestParams } from '../models/Request';

const baseUrl = "http://localhost:3000/v1";



const requestHandler = (requestParams: IRequestParams) => {

    return new Promise ( async (resolve, reject) => {

        const { url, method, params, data } = requestParams;

        const response = await axios.request({
            baseURL: baseUrl,
            url,
            params,
            method,
            data,
        })
        .then((res: any) => {
            if(res.status == 200 || res.status == 201 ) {
                resolve(res.data.data);
            }
            else {
                reject();
            }
        })
        .catch((err: any) => {
            console.log(err);
            reject();
        })
    })
}



export default requestHandler