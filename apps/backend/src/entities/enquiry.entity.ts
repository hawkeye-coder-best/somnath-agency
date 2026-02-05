import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Enquiry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column("text")
    message: string;

    @Column({ default: 'NEW' }) // NEW, READ, CONTACTED, ARCHIVED
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}
