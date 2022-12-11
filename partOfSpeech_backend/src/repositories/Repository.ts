import { injectable, unmanaged } from 'inversify';
import { Document, Model } from 'mongoose';

import { PaginateParams } from '@pbb/api/v1/controllers/BaseController';



export interface IQueryOptions {
    filter?: any;
    sort?: any;
    select?: any;
    limit?: number;
    skip?: number;
    paginateParams?: PaginateParams;
}


export interface PageInfo {
    currentPage: number;
    pagesCount: number;
    nextPage: number;
    recordsCount: number;
    perPage: number;
}


export interface Page<T> {
    records: T [];
    pageInfo: PageInfo;
}


export interface IRepository<T extends Document> {

    findMany(queryOptions?: IQueryOptions): Promise<T[]>;

    save(props: any): Promise<T>;
}


@injectable()
export default abstract class Repository<T extends Document> implements IRepository<T> {

    private static NO_NEXT_PAGE = -1;

    public constructor(@unmanaged() protected model: Model<T>) {}


    public async findMany(queryOptions: IQueryOptions): Promise<T []> {

        const filter = queryOptions.filter ? queryOptions.filter : {};
        const sort = queryOptions.sort;
        const select = queryOptions.select;
        const limit = this.getLimit(queryOptions);
        const skip = this.getSkip(queryOptions);

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


    public async paginate(queryOptions: IQueryOptions): Promise<Page<T>> {

        const filter = queryOptions.filter ? queryOptions.filter : {};
        const limit = this.getLimit(queryOptions)!;
        const skip = this.getSkip(queryOptions)!;

        const pageInfoPromise = await this.createPageInfo(filter, skip, limit);
        const recordsPromise = await this.findMany(queryOptions);

        const [records, pageInfo] = await Promise.all([recordsPromise, pageInfoPromise]);

        return {
            records: records,
            pageInfo
        };
    }


    public async save(props: any): Promise<T> {

        const instance = new this.model(props);
        const hasId = !!props._id;
        instance.isNew = !hasId;

        return instance.save();
    }


    protected async createPageInfo(filter: any, skip: number, limit: number): Promise<PageInfo> {

        const count = await this.count(filter);

        const currentPage = (skip / limit) + 1;
        const pagesCount = Math.ceil(count / limit);
        const nextPage = currentPage < pagesCount ? (currentPage + 1) : Repository.NO_NEXT_PAGE;

        return {
            currentPage,
            pagesCount,
            nextPage,
            perPage: limit,
            recordsCount: count
        }
    }


    private getLimit(queryOptions: IQueryOptions): number | undefined {

        if (queryOptions.paginateParams) {
            return queryOptions.paginateParams.perPage;
        }
        return queryOptions.limit;
    }


    private getSkip(queryOptions: IQueryOptions): number | undefined {

        if (queryOptions.paginateParams) {
            return queryOptions.paginateParams.perPage * (queryOptions.paginateParams.page - 1);
        }

        return queryOptions.skip;
    }


    private async count(filter: any): Promise<number> {
        return this.model.countDocuments(filter);
    }

}
