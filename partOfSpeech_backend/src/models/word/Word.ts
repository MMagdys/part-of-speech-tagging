import { model, Schema } from 'mongoose';
import IWordModel, { PartOfSpeech, IWordDocument } from './IWord';



const WordSchema: Schema = new Schema({
    word: {
        type: String,
        required: true,
    },
    pos: {
        type: String,
        required: true,
        enum: Object.values(PartOfSpeech),
    }

}, { timestamps: true });


const Word: IWordModel = model<IWordDocument, IWordModel>("Word", WordSchema);

export default Word;