// web-server/src/domains/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../clients/client.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash: string;

    @Column({ type: 'varchar', length: 20 })
    role: string; // 'super_admin', 'admin', 'user'

    @Column({ nullable: true })
    client_id: number;

    @ManyToOne(() => Client, {nullable: true})
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'int', default: 0 })
    failed_login_attempts: number;

    @Column({ type: 'boolean', default: false })
    is_locked: boolean;

    @Column({ type: 'timestamp', nullable: true })
    locked_until: Date | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    last_login_ip: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}