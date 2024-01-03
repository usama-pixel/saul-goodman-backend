import { User } from "../../auth/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    content: string;

    @ManyToOne(() => User)
    @JoinTable({ name: 'receiver_id' }) // Corrected the name to 'receiver_id'
    receiver: User; // Corrected the spelling to 'receiver'

    @ManyToOne(() => User)
    @JoinTable({ name: 'sender_id' })
    sender: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Assuming timestamp should be of type timestamp
    timestamp: Date;
    
    constructor(partial: Partial<Message>) {
        Object.assign(this, partial);
    }
}
