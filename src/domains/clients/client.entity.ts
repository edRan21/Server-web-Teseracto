import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    rfc: string;

    @Column({ type: 'varchar', length: 255 })
    company_name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @CreateDateColumn()
    created_at: Date;
}