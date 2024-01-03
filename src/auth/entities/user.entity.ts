import { Message } from "../../message/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    password: string;
    
    @OneToMany(() => Message, messge => messge.sender)
    sent_messages: Message[]

    @OneToMany(() => Message, messge => messge.receiver)
    recieved_messages: Message[]
}
