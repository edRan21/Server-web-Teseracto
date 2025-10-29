// web-server/src/domains/telemetry/telemetry-data.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('telemetry_data')
export class TelemetryData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    utr_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
    flow_instant: number;

    @Column({ type: 'decimal', precision: 15, scale: 4, nullable: true })
    flow_accumulated: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true })
    flow_velocity: number;

    @Column({ type: 'int', nullable: true })
    flow_direction: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    ker_code: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    unit_measurement: string;

    @CreateDateColumn()
    timestamp: Date;
}