// web-server/src/domains/reports/report.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    utr_id: number;

    @Column({ type: 'varchar', length: 100 })
    report_type: string;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'timestamp' })
    generated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}