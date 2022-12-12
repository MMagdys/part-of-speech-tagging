import Rank from '@pbb/models/rank/Rank';
import { IRankDocument } from '@pbb/models/rank/IRank';
import { injectable } from 'inversify';
import Repository, { IRepository } from './Repository';


export interface IRankRepository extends IRepository<IRankDocument> {
    
    calculateRank(score: number): Promise<number | null>;
}


@injectable()
export default class RankRepository extends Repository<IRankDocument> {

    constructor() {
        super(Rank);
    }

    public async calculateRank(score: number): Promise<number | null> {

        const total = await this.count({});
        if(!total) {
            return null;
        }

        const lessThanCount = await this.count({ score: { $lt: score } });
        if(!lessThanCount) {
            return null;
        }
        const rank = (lessThanCount / total) * 100;

        return rank;
    }

}
