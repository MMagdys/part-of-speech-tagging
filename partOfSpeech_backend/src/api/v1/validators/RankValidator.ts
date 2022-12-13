import { body } from 'express-validator';

import Validate from './Validate';


export default class RankValidator {

    public static rankScore = [
        Validate.body('score', 'Score').required().isInt({ min: 0, max: 100 }).apply(),
    ];

}
