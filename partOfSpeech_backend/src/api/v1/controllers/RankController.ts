import { Response, Request } from 'express';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '@pbb/container/types';
import BaseController from './BaseController';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import { IRankRepository } from '@pbb/repositories/RankRepository';


@controller('/v1/ranks')
export default class RankController extends BaseController {
    
    constructor(
        @inject(TYPES.IRankRepository) private rankRepository: IRankRepository,
    ) {
        super();
    }


    @httpPost('/')
    public async rankScore(@request() req: Request, @response() res: Response) {

        const score = req.body.score as number;

        const rank = await this.rankRepository.calculateRank(score);

        if(!rank) {
            return ResponseUtils.badRequest(res, 'Could not calculate Score')
        }

        return ResponseUtils.ok(res, {
            rank
        })  



    }


}
