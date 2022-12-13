import 'reflect-metadata';
import 'module-alias/register';
import container from '../src/container';
import TYPES from '../src/container/types';

import { DBHelper } from "./helpers/DbHelper";
import IWordRepository from '../src/repositories/WordRepository';
import { PartOfSpeech } from '../src/models/word/IWord';


beforeAll(DBHelper.setupDatabase);


test('Practice list length should equals to 10',async () => {

    const wordRepository = container.get<IWordRepository>(TYPES.IWordRepository);

    const practiceWordList = await wordRepository.getPracticeWords();
    if(!practiceWordList) {
        throw Error('Could not get practice list')
    }

    const expectedPracticeListLength = 10;

    expect(practiceWordList.length).toBe(expectedPracticeListLength);
});



test('Practice list should contains at least 1 verb, 1 noun, 1 adjective, 1 adverb',async () => {

    const wordRepository = container.get<IWordRepository>(TYPES.IWordRepository);

    const practiceWordList = await wordRepository.getPracticeWords();
    if(!practiceWordList) {
        throw Error('Could not get practice list')
    }

    const verbCount = practiceWordList.filter((word) => word.pos == PartOfSpeech.VERB).length
    const nounCount = practiceWordList.filter((word) => word.pos == PartOfSpeech.NOUN).length
    const adverbCount = practiceWordList.filter((word) => word.pos == PartOfSpeech.ADVERB).length
    const adjectiveCount = practiceWordList.filter((word) => word.pos == PartOfSpeech.ADJECTIVE).length

    expect(verbCount).toBeGreaterThanOrEqual(1);
    expect(nounCount).toBeGreaterThanOrEqual(1);
    expect(adverbCount).toBeGreaterThanOrEqual(1);
    expect(adjectiveCount).toBeGreaterThanOrEqual(1);
});



test('Check answer should return true in case of correct answer',async () => {

    const wordRepository = container.get<IWordRepository>(TYPES.IWordRepository);

    const practiceWordList = await wordRepository.getPracticeWords();
    if(!practiceWordList) {
        throw Error('Could not get practice list')
    }

    const wordId =  practiceWordList[0]._id.toString();
    const correctAnswer =  practiceWordList[0].pos;

    const result = await wordRepository.checkPartOfSpeechForWord(wordId, correctAnswer);

    expect(result).toBe(true);
});


test('Check answer should return false in case of wrong answer',async () => {

    const wordRepository = container.get<IWordRepository>(TYPES.IWordRepository);

    const practiceWordList = await wordRepository.getPracticeWords();
    if(!practiceWordList) {
        throw Error('Could not get practice list')
    }

    const answersList = Object.values(PartOfSpeech);
    const wordId =  practiceWordList[0]._id.toString();
    const wrongAnswer = answersList.filter((answer) => answer != practiceWordList[0].pos)[0]

    const result = await wordRepository.checkPartOfSpeechForWord(wordId, wrongAnswer);

    expect(result).toBe(false);
});


// afterAll(DBHelper.tearDownDatabase);
