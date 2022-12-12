import { Document, Model, Types } from 'mongoose';


export interface IRankProps {
    _id?: Types.ObjectId;
    score: number;
}

export interface IRankDocument extends IRankProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IRankModel extends Model<IRankDocument> { }
