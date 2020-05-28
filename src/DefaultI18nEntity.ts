import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { I18nEntityBase } from './I18nEntityBase';
import { Translated } from './Translated';

export class DefaultI18nEntity<T extends Translated<I18nEntityBase<T>>> implements I18nEntityBase<T>  {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 5 })
    locale: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('datetime', { nullable: true })
    deletedAt: Date;

    entity: any;

}