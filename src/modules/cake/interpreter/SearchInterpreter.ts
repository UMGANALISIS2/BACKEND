import { Injectable } from "@nestjs/common";
import { CakeQueryDto } from "../dto/CakeQuery.dto";
import { SentenceDto } from "../dto/SentenceDto";

@Injectable()
export class SearchInterpreter{
    parse(query: CakeQueryDto): any{
        return { $and: query.sentences.map(sentence => this.parseSentence(sentence))};
    }
   
    private parseSentence(sentence: SentenceDto): any{
        const { field, operator, value } = sentence;
        switch(operator){
            case 'eq':
                return {
                    [field]: {
                        $regex: new RegExp(value.toString(), 'i')
                    }
                }
            
            case 'or':
                const orArray = value.map((item) => ({ [field]: item }));
                return {
                    $or: orArray
                }
            case 'and':
                const andArray = value.map((item) => ({ [field]: item }));
                return {
                    $and: andArray
                }
            default: 
                throw new Error('Operador:' + operator + ' no válido')
        }
    }
}