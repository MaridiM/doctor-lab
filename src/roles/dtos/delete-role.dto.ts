import { Role } from 'src/roles/entities'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'

@InputType()
export class DeleteRoleInput extends PickType(Role, ['id']) {}

@ObjectType()
export class DeleteRoleOutput extends CoreOutput {}
