import { IWordDocument } from '@pbb/models/word/IWord';
import { injectable } from 'inversify';
import IMapper, { IMapperExtras } from './Mapper';


export interface PracticeWordDto {
	id: string;
	word: string;
}

export interface WordDto {
	id: string;
	word: string;
	pos: string;
}

interface IWordExtras extends IMapperExtras {
}


export interface IWordMapper extends IMapper<IWordDocument, WordDto, IMapperExtras> {
    toDto(document: IWordDocument, extras?: IMapperExtras): Promise<WordDto>;
    toPracticeDto(document: IWordDocument, extras?: IMapperExtras): Promise<PracticeWordDto>;
}


@injectable()
export default class WordMapper implements IWordMapper {

    constructor() {}

    public async toDto(document: IWordDocument, extras?: IWordExtras): Promise<WordDto> {
        
        return {
            id: document._id.toString(),
			word: document.word,
			pos: document.pos
        };
    }


    public async toPracticeDto(document: IWordDocument, extras?: IWordExtras): Promise<PracticeWordDto> {
        
        return {
            id: document._id.toString(),
			word: document.word,
        };
    }
}