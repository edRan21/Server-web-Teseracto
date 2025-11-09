// web-server/src/domains/reports/report.entity.ts

import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('reports')
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'utr_id'})
    utr_id: number;

    @Column ({ name: 'client_id' })
    client_id: number;

    @Column({ 
        type: 'varchar',
        length: 20 
    })
    report_type: string; // 'medidor' o 'sistema_medicion'

    @Column ({ type: 'varchar', length: 255})
    file_name: string;

    @Column ({ type: 'int' })
    file_size: number;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'date' })
    generated_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    uploaded_at: Date;

    @Column({ 
        type: 'varchar', 
        length: 20, 
        default: 'processed'
    })
    status: string;  // 'processed', 'duplicate', 'error'

}

// Ídices para optimización (se crea automáticamente con synchronize: true)
// Estos índices hacen que las búsquedas por cliente/fecha sean ultra rápida