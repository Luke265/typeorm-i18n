import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';
import { I18nColumn, I18nValue, Translated, I18nEntityBase } from '../../../src';

export interface I18nPost extends I18nEntityBase<Post> {

    title: string;

}

@Entity()
export class Post implements Translated<I18nPost> {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @I18nColumn('varchar', { nullable: false })
    title: I18nValue<string, I18nPost>;
    
    @CreateDateColumn()
    createdAt: Date;

    translations: I18nPost[];
    
}