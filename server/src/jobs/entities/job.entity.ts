import { timestamp } from "rxjs";
import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company: string;

    @Column()
    position: string;

    @Column({default: 'Başvuruldu'})
    status: string;

    @Column({nullable: true})
    platform: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    applicationDate: Date; //Otomatik bugünü atar

    @Column({ nullable: true })
    url: string;

    @Column({ type: 'text', nullable: true }) // 'text' tipi uzun yazılar içindir
    note: string;
}