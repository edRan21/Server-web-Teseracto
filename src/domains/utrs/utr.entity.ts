// web-server/src/domains/utrs/utr.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('utrs')
export class UTR {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    nsue: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    nsm: string;

    @Column({ type: 'varchar', length: 100, nullable: true})
    nsut: string;

    @Column()
    client_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitude: number;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;
}