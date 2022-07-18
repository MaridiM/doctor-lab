import * as bcrypt from 'bcrypt'
import { InternalServerErrorException } from '@nestjs/common'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsBoolean, IsDate, IsEmail, IsPhoneNumber, Length, MaxLength } from 'class-validator'
import { ELanguage } from 'src/language/dtos/languages.dto'
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm'
import { CoreEntity } from 'src/common/entities/core.entity'
import { Exclude } from 'class-transformer'
import { Role } from 'src/roles/entities/role.entity'
import { EGender } from '../users.enum'
import { UserRoles } from 'src/roles/entities/user_roles.entity'

registerEnumType(ELanguage, { name: 'ELanguage' })
registerEnumType(EGender, { name: 'EGender' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity('users')
export class User extends CoreEntity {
    @Column({ nullable: true })
    @Field(() => String)
    avatar: string

    @Column()
    @Field(() => String)
    @Length(3, 64)
    fullname: string

    @Column({ nullable: true })
    @Field(() => Date)
    @IsDate()
    birthdate: Date

    @Column({ nullable: true })
    @Field(() => String)
    @MaxLength(64)
    country: string

    @Column({ nullable: true })
    @Field(() => String)
    @MaxLength(64)
    state: string

    @Column({ nullable: true })
    @Field(() => String)
    @MaxLength(64)
    address: string

    @Column({ unique: true })
    @Field(() => String)
    @IsPhoneNumber()
    phone: string

    @Column({ unique: true })
    @Field(() => String)
    @IsEmail()
    @Length(4, 64)
    email: string

    @Column()
    @Field(() => String)
    @Length(3, 32)
    experience: string

    @Column()
    @Field(() => String)
    @Length(6, 32)
    @Exclude({ toPlainOnly: true }) // User can't get this field
    password: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    verifiedPhone: boolean // false

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    verifiedEmail: boolean // false

    @Column({ nullable: true, unique: true })
    @Field(() => String)
    facebookId: string

    @Column({ nullable: true, unique: true })
    @Field(() => String)
    googleId: string

    @Column({ type: 'enum', enum: ELanguage, default: ELanguage.RU })
    @Field(() => ELanguage)
    language: ELanguage

    @Column({ type: 'enum', enum: EGender, default: EGender.NotChosen })
    @Field(() => EGender)
    gender: EGender

    @OneToMany(() => UserRoles, userRoles => userRoles.user)
    @Field(() => [UserRoles], { defaultValue: [] })
    roles: UserRoles[]

    @OneToMany(() => Role, roles => roles.user)
    @Field(() => [Role], { defaultValue: [] })
    createdRoles: Role[]

    @OneToMany(() => UserRoles, roles => roles.setTheRole)
    @Field(() => [UserRoles], { defaultValue: [] })
    setRoles: UserRoles[]

    // @OneToMany(() => Role, roles => roles.user)
    // @Field(() => [Role])
    // createdRoles: Role[]

    // @Column({ type: 'enum', enum: EUserPermissions, nullable: true })
    // @Field(() => EUserPermissions)
    // permissions: EUserPermissions

    // @Column({ type: 'enum', enum: EUserRoles, default: EUserRoles.Clinic })
    // @Field(() => EUserRoles)
    // role: EUserRoles

    // @OneToOne(() => Clinic, clinic => clinic.owner)
    // @Field(() => Clinic)
    // clinic: Clinic

    //messages: Messages // from chat service
    //clinics: Clinic[] // Pat
    //doctors: User[Permissions='Doctor'][]//Pat, with dent
    //patients: User[Permissions='Patient'][] // Dr/pat
    //treatments: Treatment[] // Dr/pat
    //appointments: Appointment[] // Dr/pat
    //payments: Payments // from Payments service
    //rate: Ratings

    // @BeforeInsert()
    // async setPermissions(): Promise<void> {
    //     if (this.role === EUserRoles.Admin) {
    //         this.permissions = EUserPermissions.Support
    //     }
    //     if (this.role === EUserRoles.Clinic) {
    //         this.permissions = EUserPermissions.Doctor
    //     }
    //     if (this.role === EUserRoles.Patient) {
    //         this.permissions = EUserPermissions.Patient
    //     }
    // }

    /*
        Hash passwords
        Check passwords
    */
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 12)
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            return bcrypt.compare(aPassword, this.password)
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}
