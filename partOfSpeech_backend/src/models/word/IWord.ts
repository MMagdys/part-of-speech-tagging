import { Document, Model, Types } from 'mongoose';


export enum PartOfSpeech {
    NOUN = "noun",
    VERB = "verb",
    ADVERB = "adverb",
    ADJECTIVE = "adjective",
} 


export interface IWordProps {
    _id?: Types.ObjectId;
    word: string;
    pos: PartOfSpeech;
}

export interface IWordDocument extends IWordProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IWordModel extends Model<IWordDocument> { }
