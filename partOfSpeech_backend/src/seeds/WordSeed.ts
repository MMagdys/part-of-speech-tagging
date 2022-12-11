import 'reflect-metadata';
import 'module-alias/register';

import config from '@pbb/config';
import container from '@pbb/container';
import TYPES from '@pbb/container/types';
import { IWordRepository } from '@pbb/repositories/WordRepository';
import fs from 'fs';
import mongoose from 'mongoose';
import { IWordProps } from '@pbb/models/word/IWord';



const saveWordSeedFromFile = async () => {

    const collectionName = 'Words';
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

            const word = words[i] as IWordProps;
            let wordProps: IWordProps = {
                word: word.word,
                pos: word.pos
            }
            await wordRepository.save(wordProps)
        }
    });
}


saveWordSeedFromFile().then(() => {
    console.log("Seed successfull");

}).catch((error) => {
    console.log(error);

}).finally(() => {
    // process.exit();
})