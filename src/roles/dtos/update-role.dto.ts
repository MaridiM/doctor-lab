import { Role } from 'src/roles/entities'
import { Field, InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'

@InputType()
export class NoRequiredInput extends PartialType(PickType(Role, ['role', 'type', 'description'])) {}
@InputType()
export class RequiredInput extends PickType(Role, ['id']) {}
@InputType()
export class UpdateRoleInput extends IntersectionType(RequiredInput, NoRequiredInput) {}

@ObjectType()
export class UpdateRoleOutput extends CoreOutput {
    @Field(() => Role, { nullable: true })
    role?: Role
}
