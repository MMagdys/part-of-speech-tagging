import { Container } from 'inversify';
import TYPES from './MapperTypes';
import WordMapper, { IWordMapper } from '@pbb/mappers/WordMapper';


export default class RepositoryInversify {
    public static register(container: Container) {
		container.bind<IWordMapper>(TYPES.IWordMapper).to(WordMapper);
    }
}