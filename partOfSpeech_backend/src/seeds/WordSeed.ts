import 'reflect-metadata';
import 'module-alias/register';

import config from '@pbb/config';
import container from '@pbb/container';
import TYPES from '@pbb/container/types';
import { IWordRepository } from '@pbb/repositories/WordRepository';
import fs from 'fs';
import mongoose from 'mongoose';
import { IWordProps } from '@pbb/models/word/IWord';
import { IRankProps } from '@pbb/models/rank/IRank';
import { IRankRepository } from '@pbb/repositories/RankRepository';



const saveWordSeedFromFile = async () => {

    const collectionName = 'words';
    await mongoose.connect(config.mongoUrl);
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
    const isExist = collections.length == 1;
    if(isExist) {
        await mongoose.connection.db.dropCollection(collectionName);
    }

    const wordRepository = container.get<IWordRepository>(TYPES.IWordRepository);
    let words: any[];

    fs.readFile('./TestData.json', 'utf8', async function (err: any, data: any) {

        if (err) throw err;

        words = JSON.parse(data).wordList;
        
        for (let i = 0; i < words.length; i++) {

            const word = words[i];
            const wordProps: IWordProps = {
                word: word.word,
                pos: word.pos
            }
            await wordRepository.save(wordProps)
        }
    });
}

const saveRankSeedFromFile = async () => {

    const collectionName = 'ranks';
    await mongoose.connect(config.mongoUrl);
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();
    const isExist = collections.length == 1;
    if(isExist) {
        await mongoose.connection.db.dropCollection(collectionName);
    }

    const rankRepository = container.get<IRankRepository>(TYPES.IRankRepository);
    let ranks: any[];

    fs.readFile('./TestData.json', 'utf8', async function (err: any, data: any) {

        if (err) throw err;

        ranks = JSON.parse(data).scoresList;

        for (let i = 0; i < ranks.length; i++) {

            const rank = ranks[i];

            const rankProps: IRankProps = {
                score: (rank as number)
            }
            await rankRepository.save(rankProps)
        }
    });
}


const run = async () => {
    await Promise.all([
        saveWordSeedFromFile(),
        saveRankSeedFromFile()
    ])
}


run().then(() => {
    console.log("Seed successfull");

}).catch((error) => {
    console.log(error);

}).finally(() => {
    // process.exit();
})