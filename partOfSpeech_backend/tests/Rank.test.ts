import 'reflect-metadata';
import 'module-alias/register';
import container from '../src/container';
import TYPES from '../src/container/types';

import { DBHelper } from "./helpers/DbHelper";
import IRankRepository from '../src/repositories/RankRepository';
import { PartOfSpeech } from '../src/models/word/IWord';


beforeAll(DBHelper.setupDatabase);


test('Calculate ranking 90',async () => {

    const rankRepository = container.get<IRankRepository>(TYPES.IRankRepository);

    const rank = await rankRepository.calculateRank(90);
    const expectedRank = 80;

    expect(rank).toBe(expectedRank);
});


test('Calculate ranking 60',async () => {

    const rankRepository = container.get<IRankRepository>(TYPES.IRankRepository);

    const rank = await rankRepository.calculateRank(60);
    const expectedRank = 56.67;

    expect(rank).toBe(expectedRank);
});


test('Calculate ranking 50',async () => {

    const rankRepository = container.get<IRankRepository>(TYPES.IRankRepository);

    const rank = await rankRepository.calculateRank(50);
    const expectedRank = 40;

    expect(rank).toBe(expectedRank);
});


test('Calculate ranking 30',async () => {

    const rankRepository = container.get<IRankRepository>(TYPES.IRankRepository);

    const rank = await rankRepository.calculateRank(30);
    const expectedRank = 26.67;

    expect(rank).toBe(expectedRank);
});


// afterAll(DBHelper.tearDownDatabase);
