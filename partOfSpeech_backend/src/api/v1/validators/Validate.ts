import { body, query, ValidationChain } from "express-validator";
import { IsDateOptions, IsIntOptions, MinMaxOptions } from "express-validator/src/options";
import { Types } from "mongoose";

export default class Validate {

    private builder: ValidationChain;
    private name: string;

    public static body(path: string, name: string): Validate {

        const builder = body(path);
        return new Validate(builder, name);
    }

    public static query(path: string, name: string): Validate {

        const builder = query(path);
        return new Validate(builder, name);
    }

    private constructor(builder: ValidationChain, name: string) {

        this.builder = builder;
        this.name = name;
    }

    // delegated
    public isLength(options: MinMaxOptions): Validate {
        
        const message = this.name + ' should be between ' + options.min + ' and ' + options.max + ' characters';
        this.builder.isLength(options).withMessage(message);
        return this;
    }

    // delegated
    public isEmail(): Validate {
        
        this.builder.isEmail();
        return this;
    }

    // delegated
    public optional(): Validate {

        this.builder.optional();
        return this;
    }

    // delegated
    public isInt(options?: IsIntOptions) {

        this.builder.isInt(options);
        return this;
    }

    // delegated
    public isDate(options?: IsDateOptions) {

        this.builder.isDate(options);
        return this;
    }

    // delegated
    public isIn(options: any[]) {

        this.builder.isIn(options);
        return this;
    }

    //delegated
    public isDivisibleBy(num: number) {

        this.builder.isDivisibleBy(num);
        return this;
    }

    public required(): Validate {

        this.builder.not().isEmpty().withMessage('Required, ' + this.name);
        return this;
    }

    public validPassword(): Validate {

        return this.isLength({ min: 8, max: 32 });
    }

    public enum(enumType: { [name: string]: string }): Validate {
        
        this.builder.isIn(Object.values(enumType));

        return this;
    }
    
    public validId(): Validate {

        this.builder.custom((value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Id, ' + this.name);
            }
            return true;
        });

        return this;
    }

    public apply(): ValidationChain {

        return this.builder;
    }
    
}