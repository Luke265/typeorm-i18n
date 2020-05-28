import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column
} from 'typeorm';
import { I18nValue, I18nColumnProxy, Translated, I18nEntityBase, I18nEntity, I18nColumn } from '../../../src';
import { Length } from "class-validator";

export interface I18nPost extends I18nEntityBase<Post> {

    title: string;

}

// Basically @Entity(), but this one is only for the I18n entity class
@I18nEntity({ name: 'MyCustomName' })
@Entity()
export class Post implements Translated<I18nPost> {

    @PrimaryGeneratedColumn()
    id: number;
    
    // I18nColumnProxy allows us to pass other decorators to I18n entity class
    @I18nColumnProxy(Length(2, 3))
    @I18nColumn(Column('varchar', { nullable: false }))
    title: I18nValue<string, I18nPost>;
    
    @CreateDateColumn()
    createdAt: Date;

    translations: I18nPost[];

}