import { injectable, unmanaged } from 'inversify';
import { Document, Model } from 'mongoose';



export interface IQueryOptions {
    filter?: any;
    sort?: any;
    select?: any;
    populate?: any;
    limit?: number;
    skip?: number;
}


export interface IRepository<T extends Document> {

    findById(id: any): Promise<T | null>;

    findOne(queryOptions?: IQueryOptions): Promise<T | null>;

    findMany(queryOptions?: IQueryOptions): Promise<T[]>;

    save(props: any): Promise<T>;
}


@injectable()
export default abstract class Repository<T extends Document> implements IRepository<T> {

    private static NO_NEXT_PAGE = -1;

    public constructor(@unmanaged() protected model: Model<T>) {}

    
    public async findById(id: any): Promise<T | null> {
        return await this.model.findById(id);
    }


    public async findOne(queryOptions?: IQueryOptions): Promise<T | null> {
        
        const filter = queryOptions?.filter ? queryOptions.filter : {};
        const populate = queryOptions?.populate;
        return await this.model.findOne(filter);
    }



    public async findMany(queryOptions: IQueryOptions): Promise<T []> {

        const filter = queryOptions.filter ? queryOptions.filter : {};
        const sort = queryOptions.sort;
        const select = queryOptions.select;
        const limit = queryOptions.limit;
        const skip = queryOptions.skip;

        var query = this.model.find(filter);

        if (select) {
            query = query.select(select);
        }
        if (sort) {
            query = query.sort(sort);
        }
        if (skip) {
            query = query.skip(skip);
        }
        if (limit) {
            query = query.limit(limit);
        }

        return await query;
    }


    public async save(props: any): Promise<T> {

        const instance = new this.model(props);
        const hasId = !!props._id;
        instance.isNew = !hasId;

        return instance.save();
    }

    
    public async count(filter: any): Promise<number> {
        return this.model.countDocuments(filter);
    }
    

}
