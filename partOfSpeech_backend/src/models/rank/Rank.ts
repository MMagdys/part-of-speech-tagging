import { model, Schema } from 'mongoose';
import IRankModel, { IRankDocument } from './IRank';



const RankSchema: Schema = new Schema({
    score: {
        type: Number,
        required: true,
    }
}, { timestamps: true });


const Rank: IRankModel = model<IRankDocument, IRankModel>("Rank", RankSchema);

export default Rank;