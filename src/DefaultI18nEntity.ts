import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { I18nEntity } from './I18nEntity';
import { Translated } from './Translation';

export class DefaultI18nEntity<T extends Translated<I18nEntity<T>>> implements I18nEntity<T> {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 5 })
    locale: string;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column('datetime', { nullable: true })
    deletedAt: Date;

    entity: any;

}