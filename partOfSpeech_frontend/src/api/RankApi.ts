import { IRequestParams } from '../models/Request';
import ApiClient from '../utils/ApiClient';



export const getRank = (score: number) => {

    const requestParams: IRequestParams = {
        url: '/ranks',
        method: "POST",
        data: { score }
    }

    return ApiClient(requestParams);
}
