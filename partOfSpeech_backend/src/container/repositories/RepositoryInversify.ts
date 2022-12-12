import { Container } from 'inversify';
import TYPES from './RepositoryTypes';
import WordRepository, { IWordRepository } from '@pbb/repositories/WordRepository';
import RankRepository, { IRankRepository } from '@pbb/repositories/RankRepository';



export default class RepositoryInversify {
  public static register(container: Container) {
        
		container.bind<IWordRepository>(TYPES.IWordRepository).to(WordRepository);
		container.bind<IRankRepository>(TYPES.IRankRepository).to(RankRepository);    
  }
}