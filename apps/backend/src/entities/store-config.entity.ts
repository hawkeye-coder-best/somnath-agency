import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StoreConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'Somnath Agency' })
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    whatsapp: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    heroTitle: string;

    @Column({ nullable: true })
    email: string;
}
