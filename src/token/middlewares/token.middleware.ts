import { LanguageService } from 'src/language/language.service'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ForbiddenException } from 'src/exceptions'
import { UsersService } from 'src/users/users.service'
import { TokenService } from '../token.service'
import { tokenKey } from '../config/token.enums'
import { User } from 'src/users/entities'

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    constructor(
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
        private readonly languageService: LanguageService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if (tokenKey.JWT in req.headers) {
            const accessToken = req.headers[tokenKey.JWT]
            try {
                const decoded = await this.tokenService.validateAccessToken(accessToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const user = await this.usersService.findById({ id: decoded.id })
                    req['user'] = user.user
                }
            } catch (error) {
                console.log(error.message)
                if (error.message === 'jwt expired') {
                    await this.tokenService.removeExpiredAccessToken(accessToken.toString())
                    next(
                        new ForbiddenException({
                            token_expired: await this.languageService.setError(['token', 'expired'], 'auth'),
                        }),
                    )
                }
                next(
                    new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    }),
                )
            }
        }
        if (tokenKey.RECOVERY_JWT in req.headers) {
            const accessToken = req.headers[tokenKey.RECOVERY_JWT]
            try {
                const decoded = await this.tokenService.validateAccessToken(accessToken.toString())
                let user
                if (typeof decoded === 'object' && decoded.hasOwnProperty('phone')) {
                    user = await this.usersService.findByPhone({ phone: decoded.phone })
                }
                if (typeof decoded === 'object' && decoded.hasOwnProperty('email')) {
                    user = await this.usersService.findByEmail({ email: decoded.email })
                }
                req['recovery_user'] = user.user
            } catch (error) {
                console.log(error.message)
                if (error.message === 'jwt expired') {
                    await this.tokenService.removeExpiredAccessToken(accessToken.toString())
                    next(
                        new ForbiddenException({
                            token_expired: await this.languageService.setError(['token', 'expired'], 'auth'),
                        }),
                    )
                }
                next(
                    new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    }),
                )
            }
        }
        next()
    }
}