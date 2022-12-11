import Word from '@pbb/models/word/Word';
import { IWordDocument } from '@pbb/models/word/IWord';
import { injectable } from 'inversify';
import Repository, { IRepository } from './Repository';



export interface IWordRepository extends IRepository<IWordDocument> {
    
}



@injectable()
export default class WordRepository extends Repository<IWordDocument> {

    constructor() {
        super(Word);
    }
}
