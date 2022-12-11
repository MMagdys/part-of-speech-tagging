import Word from '@pbb/models/word/Word';
import { IWordDocument, PartOfSpeech } from '@pbb/models/word/IWord';
import { injectable } from 'inversify';
import Repository, { IRepository } from './Repository';


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

        const verbWord = await this.findOne({
            filter: { pos: PartOfSpeech.VERB },
        
        });
        if(!verbWord) {
            return null;
        }

        const nounWord = await this.findOne({
            filter: { pos: PartOfSpeech.NOUN },
            select: 'word'
        });
        if(!nounWord) {
            return null;
        }

        const adjectiveWord = await this.findOne({
            filter: { pos: PartOfSpeech.ADJECTIVE },
            select: 'word'
        });
        if(!adjectiveWord) {
            return null;
        }

        const adverbWord = await this.findOne({
            filter: { pos: PartOfSpeech.ADVERB },
            select: 'word'
        });
        if(!adverbWord) {
            return null;
        }

        practiceWords.push(verbWord);
        practiceWords.push(nounWord);
        practiceWords.push(adjectiveWord);
        practiceWords.push(adverbWord);
        
        const practiceWordIds = practiceWords.map((word) => word._id)

        // find random
        const retrievedWords = await this.findMany({
            filter: { _id: { $nin: practiceWordIds } },
            limit: 6
        })

        if(!retrievedWords) {
            return null;
        }

        practiceWords.push(...retrievedWords);

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
