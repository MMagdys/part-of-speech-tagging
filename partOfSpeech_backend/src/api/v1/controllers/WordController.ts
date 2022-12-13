import { Response, Request } from 'express';
import { controller, httpGet, httpPost, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';

import TYPES from '@pbb/container/types';
import BaseController from './BaseController';
import { IWordRepository } from '@pbb/repositories/WordRepository';
import ResponseUtils from '@pbb/utils/ResponseUtils';
import { IWordMapper } from '@pbb/mappers/WordMapper';
import WordValidator from '../validators/WordValidator';


@controller('/v1/words')
export default class WordController extends BaseController {
    
    constructor(
        @inject(TYPES.IWordRepository) private wordRepository: IWordRepository,
        @inject(TYPES.IWordMapper) private wordMapper: IWordMapper,
    ) {
        super();
    }


    @httpGet('/practice')
    public async getPracticeWords(@request() req: Request, @response() res: Response) {


        const practiceWords = await this.wordRepository.getPracticeWords();

        if(!practiceWords) {
            return ResponseUtils.badRequest(res, 'Could not get practice list')
        }

        const mappedWords = await Promise.all(practiceWords.map((word) => this.wordMapper.toPracticeDto(word)))

        return ResponseUtils.ok(res, {
            words: mappedWords
        })
    }


    @httpPost('/checkPOS', ...WordValidator.checkPOS)
    public async checkPartOfSpeech(@request() req: Request, @response() res: Response) {

        if (!this.validateRequest(req, res)) {
            return
        }

        const wordId = req.body.wordId;
        const userAnswer = req.body.userAnswer;

        const result = await this.wordRepository.checkPartOfSpeechForWord(wordId, userAnswer);

        if(result == null) {
            return ResponseUtils.badRequest(res, 'Could not check word')
        }

        return ResponseUtils.ok(res, {
            result
        })
    }


}
