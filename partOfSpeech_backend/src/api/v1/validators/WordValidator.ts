import { PartOfSpeech } from '@pbb/models/word/IWord';
import { body } from 'express-validator';

import Validate from './Validate';


export default class WordValidator {

    public static checkPOS = [
        Validate.body('wordId', 'Word Id').required().apply(),
        Validate.body('userAnswer', 'User Answer').required().enum(PartOfSpeech).apply(),
    ];

}
