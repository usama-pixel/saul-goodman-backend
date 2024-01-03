import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserRoles {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ nullable: true, default: 'user' })
    types: string
    
    @BeforeInsert()
    async setType(type: string) {
        this.types = type;
    }
}