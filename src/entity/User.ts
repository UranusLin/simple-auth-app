import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ default: '' })
    name!: string;

    // Initialize emailVerified to false by default.
    @Column({ default: false })
    emailVerified: boolean = false;

    // Mark emailVerificationToken as optional.
    @Column({ nullable: true })
    emailVerificationToken!: string;

    @Column({ default: 0 })
    loginCount!: number;

    @CreateDateColumn()
    signUpTimestamp!: Date;

    @UpdateDateColumn()
    lastLoginTimestamp!: Date;
}
