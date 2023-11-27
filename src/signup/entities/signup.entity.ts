import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'details'})
export class Signup {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string;

    @Column()
    password:string;

    @CreateDateColumn()
    createdAt:Date;

    @Column({nullable:true})
    createdBy:number;

    @UpdateDateColumn({nullable:true})
    updatedAt:Date;

    @Column({nullable:true})
    updatedBy:number;

    @DeleteDateColumn({nullable:true})
    deletedAt:Date;

    @Column({nullable:true})
    deletedBy:number;
}
