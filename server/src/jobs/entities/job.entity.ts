import { timestamp } from "rxjs";
import { Entity,PrimaryGeneratedColumn,Column ,ManyToOne } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity('jobs')
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

    @ManyToOne(() => User, (user) => user.jobs, { eager: false })
    user: User;

    @Column({ nullable: true }) // Geçici olarak nullable yapıyoruz ki mevcut veriler patlamasın
    userId: number;
}