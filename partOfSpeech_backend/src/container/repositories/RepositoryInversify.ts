import { Container } from 'inversify';
import TYPES from './RepositoryTypes';
import WordRepository, { IWordRepository } from '@pbb/repositories/WordRepository';



export default class RepositoryInversify {
  public static register(container: Container) {
        
		container.bind<IWordRepository>(TYPES.IWordRepository).to(WordRepository);        
  }
}