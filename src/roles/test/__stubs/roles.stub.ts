import { userStub } from 'src/users/test/__stubs'
import { ERolesType } from '../../roles.enums'
import { RolesStub, UserRolesStub } from '../types'

export const systemRolesStub = (): RolesStub[] => [
    {
        id: 1,
        role: 'super_admin',
        roleKey: 'super_admin',
        description: 'Default system role',
        type: ERolesType.system,
        user: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        _v: 1,
    },
    {
        id: 2,
        role: 'admin',
        roleKey: 'admin',
        description: 'Default system role',
        type: ERolesType.system,
        user: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        _v: 1,
    },
    {
        id: 3,
        role: 'patient',
        roleKey: 'patient',
        description: 'Default system role',
        type: ERolesType.system,
        user: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        _v: 1,
    },
    {
        id: 4,
        role: 'doctor',
        roleKey: 'doctor',
        description: 'Default system role',
        type: ERolesType.system,
        user: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        _v: 1,
    },
    {
        id: 5,
        role: 'dentist',
        roleKey: 'dentist',
        description: 'Default system role',
        type: ERolesType.system,
        user: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        _v: 1,
    },
]

export const customRoleStub = (): RolesStub => ({
    id: 6,
    role: 'SomeRole',
    roleKey: 'some_role',
    description: 'some_role role description',
    type: ERolesType.custom,
    user: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 1,
})

export const userRolesStub = (type: 'system' | 'custom' = 'system'): UserRolesStub => ({
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    _v: 1,
    type,
    user: { ...userStub() },
    role: { ...systemRolesStub()[0] },
    setTheRole: null,
})
