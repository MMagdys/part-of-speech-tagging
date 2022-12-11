import { Document } from 'mongoose';

export interface IMapperExtras {}

export default interface IMapper<T extends Document, U, V extends IMapperExtras> {
    
    toDto(document: T, extras?: V): Promise<U>;
}
