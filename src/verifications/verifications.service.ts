import { Injectable, Inject, ForbiddenException } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { relationsConfig } from 'src/common/configs'
import { EmailService } from 'src/email/email.service'
import { ValidationException } from 'src/exceptions'
import { TokenService } from 'src/token/token.service'
import { LanguageService } from 'src/language/language.service'
import { PhoneService } from 'src/phone/phone.service'
import { User } from 'src/users/entities'
import { EResetKey } from 'src/users/config/users.enum'
import { Repository } from 'typeorm'
import {
    ChangeOutputCode,
    VerificationInput,
    VerificationOutput,
    PasswordRecoveryCodeInput,
    RecoveryOutput,
} from './dtos'
import { VerificationEmail, VerificationPhone, ConfirmEmail, ConfirmPhone } from './entities'
import { EConfirmCodeKey } from './verifications.enums'

@Injectable()
export class VerificationsService {
    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verifyEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verifyPhone: Repository<VerificationPhone>,
        @InjectRepository(ConfirmEmail) private readonly confirmEmail: Repository<ConfirmEmail>,
        @InjectRepository(ConfirmPhone) private readonly confirmPhone: Repository<ConfirmPhone>,
        private readonly languageService: LanguageService,
        private readonly phoneService: PhoneService,
        private readonly emailService: EmailService,
        private readonly token: TokenService,
    ) {}

    /**
     * Verrification code, send email
     * @param user: User
     */
    async verificationEmailCode(user: User): Promise<boolean> {
        // If code exists delete
        const codes = await this.verifyEmail.find({ ...relationsConfig.verifications })
        const existCode = codes.filter(code => code.user.id === user.id)

        if (existCode.length) {
            await this.verifyEmail.delete(existCode[0].id)
        }

        // Create Code for email and phone
        const codeEmail = await this.verifyEmail.save(this.verifyEmail.create({ user }))
        let sendedCode = false

        // Send verification on email and phone
        if (codeEmail) {
            sendedCode = await this.emailService.sendVerificationEmail(user.email, user.fullname, codeEmail.code)
        } else {
            throw new ValidationException({
                invalid_sending_email: await this.languageService.setError(['isNotVerify', 'noSendEmail']),
            })
        }

        return sendedCode
    }

    /**
     * Verification code, send sms
     * @param user: User
     */
    async verificationPhoneCode(user: User): Promise<boolean> {
        // If code exists delete
        const codes = await this.verifyPhone.find({ ...relationsConfig.verifications })
        const existCode = codes.filter(code => code.user.id === user.id)

        if (existCode.length) {
            await this.verifyPhone.delete(existCode[0].id)
        }

        // Create Code for phone
        const codePhone = await this.verifyPhone.save(this.verifyPhone.create({ user }))
        let sendedCode = false

        // Send verification  phone
        if (codePhone) {
            // * SEND SMS
            // sendedCode = await this.phoneService.sendVerificationSMS(user.phone, codePhone.code)
            sendedCode = true
        } else {
            throw new ValidationException({
                invalid_sending_phone: await this.languageService.setError(['isNotVerify', 'noSendSMS']),
            })
        }
        return sendedCode
    }

    /**
     * Confirm code, send sms or email
     * @param body phone number or email
     */
    async passwordRecoveryCode(body: PasswordRecoveryCodeInput): Promise<RecoveryOutput> {
        if (body) {
            /*
                If Recovery Code with email
            */
            if (body.email) {
                // Check to existing user
                const user = await this.users.findOne({ where: { email: body.email } })
                if (!user) {
                    throw new ValidationException({
                        invalid_email: await this.languageService.setError(['isNotExist', 'email'], 'users'),
                    })
                }

                // Check to exits code
                // Delete if code is exists
                const existsCode = await this.confirmEmail.findOne({
                    where: { email: body.email, key: EConfirmCodeKey.recovery_password },
                })
                if (existsCode) {
                    await this.confirmEmail.delete({ email: body.email, key: EConfirmCodeKey.recovery_password })
                }

                // Create new code
                const code = await this.confirmEmail.save(
                    this.confirmEmail.create({ email: body.email, key: EConfirmCodeKey.recovery_password }),
                )
                if (!code) {
                    throw new ValidationException({
                        invalid_sending_email: await this.languageService.setError(
                            ['isNotVerify', 'noSendEmail'],
                            'verify',
                        ),
                    })
                }

                // Send mail to body.email
                const sendedEmail = await this.emailService.sendPasswordRecovery(user.email, code.code)
                return { ok: Boolean(sendedEmail) }
            }

            /*
                If Recovery Code with phone
            */
            if (body.phone) {
                // Check to existing user
                const user = await this.users.findOne({ where: { phone: body.phone } })
                if (!user) {
                    throw new ValidationException({
                        invalid_phone: await this.languageService.setError(['isNotExist', 'phone'], 'users'),
                    })
                }

                // Check to exits code
                // Delete if code is exists
                const existsCode = await this.confirmPhone.findOne({
                    where: { phone: body.phone, key: EConfirmCodeKey.recovery_password },
                })
                if (existsCode) {
                    await this.confirmPhone.delete({ phone: body.phone, key: EConfirmCodeKey.recovery_password })
                }

                // Create new code
                const code = await this.confirmPhone.save(
                    this.confirmPhone.create({ phone: body.phone, key: EConfirmCodeKey.recovery_password }),
                )
                if (!code) {
                    throw new ValidationException({
                        invalid_sending_sms: await this.languageService.setError(
                            ['isNotVerify', 'noSendSMS'],
                            'verify',
                        ),
                    })
                }

                // Send mail to body.sms
                // const sendedSms = await this.phoneService.sendPasswordRecoverySMS(user.phone, code.code)
                // return { ok: Boolean(sendedSms) }
                return { ok: true }
            }
        }

        throw new ValidationException({
            invalid_sending_sms: await this.languageService.setError(['isEmpty', 'fields'], 'verify'),
        })
    }

    /**
     *  Send current user email with code for change password
     */
    async changePasswordCode(): Promise<ChangeOutputCode> {
        const currentUser: User = await this.token.getContextUser(this.context)

        // Check to exits code
        // Delete if code is exists
        const existsCode = await this.confirmPhone.findOne({
            where: { phone: currentUser.phone, key: EConfirmCodeKey.change_password },
        })
        if (existsCode) {
            await this.confirmPhone.delete({ phone: currentUser.phone, key: EConfirmCodeKey.change_password })
        }

        // Create new code
        const code = await this.confirmPhone.save(
            this.confirmPhone.create({ phone: currentUser.phone, key: EConfirmCodeKey.change_password }),
        )
        if (!code) {
            throw new ValidationException({
                invalid_sending_phone: await this.languageService.setError(['isNotVerify', 'noSendSMS'], 'verify'),
            })
        }

        // Send mail to body.Sms
        // const sendedSms = await this.phoneService.sendChangePasswordSMS(currentUser.phone, code.code)
        // return { ok: Boolean(sendedSms) }
        return { ok: Boolean(true) }
    }

    /**
     * Send code on current user email for change email
     */
    async changeEmailCode(): Promise<ChangeOutputCode> {
        const currentUser: User = await this.token.getContextUser(this.context)

        // Check to exits code
        // Delete if code is exists
        const existsCode = await this.confirmEmail.findOne({
            where: { email: currentUser.email, key: EConfirmCodeKey.change_email },
        })
        if (existsCode) {
            await this.confirmEmail.delete({ email: currentUser.email, key: EConfirmCodeKey.change_email })
        }

        // Create new code
        const code = await this.confirmEmail.save(
            this.confirmEmail.create({ email: currentUser.email, key: EConfirmCodeKey.change_email }),
        )
        if (!code) {
            throw new ValidationException({
                invalid_sending_email: await this.languageService.setError(['isNotVerify', 'noSendEmail'], 'verify'),
            })
        }

        // Send mail to body.email
        const sendedEmail = await this.emailService.sendChangeEmail(currentUser.email, currentUser.fullname, code.code)
        return { ok: Boolean(sendedEmail) }
    }

    /**
     * Send current user phone code for change phone
     */
    async changePhoneCode(): Promise<ChangeOutputCode> {
        const currentUser: User = await this.token.getContextUser(this.context)

        // Check to exits code
        // Delete if code is exists
        const existsCode = await this.confirmPhone.findOne({
            where: { phone: currentUser.phone, key: EConfirmCodeKey.change_phone },
        })
        if (existsCode) {
            await this.confirmPhone.delete({ phone: currentUser.phone, key: EConfirmCodeKey.change_phone })
        }

        // Create new code
        const code = await this.confirmPhone.save(
            this.confirmPhone.create({ phone: currentUser.phone, key: EConfirmCodeKey.change_phone }),
        )
        if (!code) {
            throw new ValidationException({
                invalid_sending_phone: await this.languageService.setError(['isNotVerify', 'noSendSMS'], 'verify'),
            })
        }

        // Send mail to body.Sms
        // const sendedSms = await this.phoneService.sendVerificationSMS(currentUser.phone, code.code)
        // return { ok: Boolean(sendedSms) }
        return { ok: Boolean(true) }
    }

    /**
     * Verification phone by code
     * @param body code
     */
    async verificationEmail({ code }: VerificationInput): Promise<VerificationOutput> {
        const verification = await this.verifyEmail.findOne({ where: { code }, ...relationsConfig.verifications })

        if (!verification) {
            throw new ValidationException({
                error: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            verification.user.verifiedEmail = true
            await this.users.save(verification.user)
            await this.verifyEmail.delete(verification.id)

            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification phone by code
     * @param body code
     */
    async verificationPhone({ code }: VerificationInput): Promise<VerificationOutput> {
        const verification = await this.verifyPhone.findOne({ where: { code }, ...relationsConfig.verifications })

        if (!verification)
            throw new ValidationException({
                phone: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })

        try {
            verification.user.verifiedPhone = true
            await this.users.save(verification.user)
            await this.verifyPhone.delete(verification.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                phone: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification password recovery by code
     * @param body code
     */
    async verificationPasswordRecovery({ code }: VerificationInput): Promise<VerificationOutput> {
        // Check existing to code in database
        let existsCode: any = {}
        let user: User

        // If phone code find on confirmPhone if not to confirmEmail
        if (code.length <= 6) {
            user = await this.users.findOne({ where: { phone: existsCode.phone }, ...relationsConfig.users })
            if (!user) {
                throw new ValidationException({
                    error_phone: await this.languageService.setError(['isNotExist', 'phone'], 'user'),
                })
            }
            existsCode = await this.confirmPhone.findOne({
                where: { code, phone: user.phone, key: EConfirmCodeKey.recovery_password },
            })
        } else {
            user = await this.users.findOne({ where: { email: existsCode.email }, ...relationsConfig.users })
            if (!user) {
                throw new ValidationException({
                    error_email: await this.languageService.setError(['isNotExist', 'email'], 'user'),
                })
            }
            existsCode = await this.confirmEmail.findOne({
                where: { code, email: user.email, key: EConfirmCodeKey.recovery_password },
            })
        }
        // Check existsCode
        if (!existsCode) {
            throw new ValidationException({
                invalid_code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            // Delete code
            const deletedCode = await this.confirmPhone.delete({ code, key: EConfirmCodeKey.recovery_password })

            // Create token
            const token = await this.token.generateTokens({ id: user.id }, true)

            return { ok: Boolean(deletedCode.affected > 0), token: token.accessToken }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification change password by code
     * @param body code
     */
    async verificationChangePassword({ code }: VerificationInput): Promise<VerificationOutput> {
        // Get user and check it
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exist: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check existing to code in database
        const existsCode = await this.confirmPhone.findOne({
            where: { code, phone: user.phone, key: EConfirmCodeKey.change_password },
        })
        console.log(existsCode)
        if (!existsCode) {
            throw new ValidationException({
                invalid_code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            user.resetKey = EResetKey.password
            await this.users.save(user)

            // Delete code
            // const deletedCode = await this.confirmPhone.delete({ code, key: EConfirmCodeKey.change_password })
            // return { ok: Boolean(deletedCode.affected > 0) }
            return { ok: Boolean(true) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification change email by code
     * @param body code
     */
    async verificationChangeEmail({ code }: VerificationInput): Promise<VerificationOutput> {
        // Get user and check it
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exist: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check existing to code in database
        const existsCode = await this.confirmEmail.findOne({
            where: { code, email: user.email, key: EConfirmCodeKey.change_email },
        })
        if (!existsCode) {
            throw new ValidationException({
                invalid_code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            user.resetKey = EResetKey.email
            await this.users.save(user)

            // Delete code
            const deletedCode = await this.confirmEmail.delete({ code, key: EConfirmCodeKey.change_email })
            return { ok: Boolean(deletedCode.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }

    /**
     * Verification change phone by code
     * @param body code
     */
    async verificationChangePhone({ code }: VerificationInput): Promise<VerificationOutput> {
        // Get user and check it
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exist: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check existing to code in database
        const existsCode = await this.confirmPhone.findOne({
            where: { code, phone: user.phone, key: EConfirmCodeKey.change_phone },
        })
        if (!existsCode) {
            throw new ValidationException({
                invalid_code: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }

        try {
            user.resetKey = EResetKey.phone
            await this.users.save(user)

            // Delete code
            const deletedCode = await this.confirmPhone.delete({ code, key: EConfirmCodeKey.change_phone })
            return { ok: Boolean(deletedCode.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotVerify', 'code'], 'verify'),
            })
        }
    }
}
