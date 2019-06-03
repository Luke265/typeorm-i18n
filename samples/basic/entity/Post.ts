import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';
import { I18nColumn, I18nValue } from '../../../src';

@Entity()
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @I18nColumn('varchar', { nullable: false })
    title: I18nValue<string>;
    
    @CreateDateColumn()
    createdAt: Date;

}