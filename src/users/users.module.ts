import { JwtModule } from './../jwt/jwt.module'
import { VerifyPhone } from './entities/verify-phone.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { User } from './entities/user.entity'
import { VerifyEmail } from './entities/verify-email.entity'
import { UserMutations } from './resolvers/users.mutations'
import { UserQueries } from './resolvers/users.queries'
import { UserService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, VerifyEmail, VerifyPhone]), NotifiesModule, JwtModule],
    providers: [UserService, UserQueries, UserMutations],
    exports: [UserService],
})
export class UsersModule {}