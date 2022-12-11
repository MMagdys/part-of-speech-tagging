import { Response, Request } from 'express';
import { controller, httpGet, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '@pbb/container/types';
import BaseController from './BaseController';
import { IWordRepository } from '@pbb/repositories/WordRepository';
import ResponseUtils from '@pbb/utils/ResponseUtils';


@controller('/v1/words')
export default class WordController extends BaseController {
    
    constructor(
        @inject(TYPES.IWordRepository) private wordRepository: IWordRepository,
    ) {
        super();
    }


    @httpGet('/practice')
    public async getPracticeWords(@request() req: Request, @response() res: Response) {


        const practiceWords = await this.wordRepository.getPracticeWords();

        return ResponseUtils.ok(res, {
            practiceWords
        })

    }


}
