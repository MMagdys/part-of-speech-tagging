import { IRequestParams } from '../models/Request';
import ApiClient from '../utils/ApiClient';



export const getPracticeList = () => {

    const requestParams: IRequestParams = {
        url: '/words/practice',
        method: "GET",
    }

    return ApiClient(requestParams);
}


export const checkChoice = (params: { wordId: string, userAnswer: string }) => {

    const requestParams: IRequestParams = {
        url: '/words/checkPOS',
        method: "POST",
        data: params
    }

    return ApiClient(requestParams);
}
