import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { PhoneService } from 'src/phone/phone.service'
import { VerifyPhoneInput, VerifyPhoneOutput } from './dtos/verify-phone.dto'

@Resolver()
export class PhoneResolver {
    constructor(private readonly phoneService: PhoneService) {}

    @Mutation(() => VerifyPhoneOutput)
    async verifyPhone(@Args('input') code: VerifyPhoneInput): Promise<VerifyPhoneOutput> {
        return await this.phoneService.verificationPhone(code)
    }
}