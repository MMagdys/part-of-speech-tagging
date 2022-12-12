import Word from '@pbb/models/word/Word';
import { IWordDocument, PartOfSpeech } from '@pbb/models/word/IWord';
import { injectable } from 'inversify';
import Repository, { IRepository } from './Repository';
import ArrayUtils from '@pbb/utils/ArrayUtils';


export interface PracticeWord {
    _id: string,
    word: string
}

export interface IWordRepository extends IRepository<IWordDocument> {

    getPracticeWords(): Promise<IWordDocument[] | null>;

    checkPartOfSpeechForWord(wordId: string, userAnswer: string): Promise<Boolean | null>;
}



@injectable()
export default class WordRepository extends Repository<IWordDocument> {

    constructor() {
        super(Word);
    }


    public async getPracticeWords(): Promise<IWordDocument[] | null> {

        const practiceWords: IWordDocument[] = [];

        const verbWord: IWordDocument[] = await this.model.aggregate([ 
            { $match : {  pos: PartOfSpeech.VERB } },
            { $sample: { size: 1 } }
        ])
        if(verbWord.length < 1) {
            return null;
        }

        const nounWord: IWordDocument[] = await this.model.aggregate([ 
            { $match : {  pos: PartOfSpeech.NOUN } },
            { $sample: { size: 1 } }
        ])
        if(nounWord.length < 1) {
            return null;
        }

        const adjectiveWord: IWordDocument[] = await this.model.aggregate([ 
            { $match : {  pos: PartOfSpeech.ADJECTIVE } },
            { $sample: { size: 1 } }
        ])
        if(adjectiveWord.length < 1) {
            return null;
        }

        const adverbWord: IWordDocument[] = await this.model.aggregate([ 
            { $match : {  pos: PartOfSpeech.ADVERB } },
            { $sample: { size: 1 } }
        ])
        if(adverbWord.length < 1) {
            return null;
        }

        practiceWords.push(verbWord[0]);
        practiceWords.push(nounWord[0]);
        practiceWords.push(adjectiveWord[0]);
        practiceWords.push(adverbWord[0]);
        const practiceWordIds = practiceWords.map((word) => word._id)

        const retrievedWords = await this.model.aggregate([ 
            { $match : {  _id: { $nin: practiceWordIds } } },
            { $sample: { size: 6 } }
        ])
        
        if(!retrievedWords) {
            return null;
        }

        practiceWords.push(...retrievedWords);
        ArrayUtils.shuffleArray(practiceWords)

        return practiceWords;
    }


    public async checkPartOfSpeechForWord(wordId: string, userAnswer: string): Promise<Boolean | null> {

        const retrievedWord = await this.findById(wordId);

        if(!retrievedWord) {
            return null;
        }

        if(retrievedWord.pos == userAnswer) {
            return true;
        }

        return false;

    }
}
