import { DeffaultMessages } from 'src/language/dtos/notify.dto'

export const defaultErrors: DeffaultMessages = {
    isNotAuth: {
        auth: 'User is not authorized',
    },
    token: {
        expired: 'Token has expired',
        notCreated: "Couldn't create token, try to login",
    },
    isExists: {
        role: 'Role already exists',
        phone: 'There is user with that phone already',
        email: 'There is user with that email already',
    },
    isNotExist: {
        role: 'Role does not exist',
        phone: 'No user found with this phone number',
        email: 'User with this email address not found',
    },
    isValid: {
        passwordEqual: "Passwords don't match",
        googleId: 'Invalid google',
        facebookId: 'Invalid facebook',
    },
    isLength: {
        password: 'Password must be longer than or equal to 6 and no longer than 32 characters',
    },
    permission: {
        createSystemRole: 'You do not have permission to create the system role',
        updateSystemRole: `You do not have permission to update the system role`,
        deleteSystemRole: `You do not have permission to remove the system role`,
    },
    isNotVerify: {
        noSendEmail: 'Unable to send you email',
        noSendSMS: 'Unable to send you SMS',
        email: 'Not a valid verification link',
        phone: 'Invalid code',
    },
    isNot: {
        foundUser: 'The user is not found',
        createUser: "Couldn't create account",
        updateUser: "Couldn't update account",
        deleteUser: "Couldn't deleted account",
        foundRole: 'The role is not found',
        foundRoles: 'Roles is not found',
        createRole: "Couldn't create role",
        updateRole: "Couldn't update role",
        deleteRole: "Couldn't delete role",
    },
    isEmpty: {
        all: 'Role update data missing',
    },
}