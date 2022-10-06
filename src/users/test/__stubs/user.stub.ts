import { ELanguage } from 'src/language/dtos/languages.dto'
import { systemUserParams } from 'src/users/config/users.config'
import { EGender } from 'src/users/config/users.enum'
import { UserStub } from '../types'

export const systemUserStub = (): UserStub => {
    return systemUserParams
}

export const userStub = (): UserStub => {
    return {
        id: 1,
        fullname: 'dl_user',
        email: 'dl.service@email.com',
        phone: '+380979995500',
        password: 'dl.password',
        verifiedPhone: false,
        verifiedEmail: false,
        avatar: '',
        birthdate: undefined,
        country: '',
        state: '',
        address: '',
        experience: '',
        facebookId: '',
        googleId: '',
        language: ELanguage.RU,
        gender: EGender.NotChosen,
        roles: [],
        createdRoles: [],
        setRoles: [],
        helpMessage: [],
        resetKey: null,
        createdAt: undefined,
        updatedAt: undefined,
        _v: 0,
    }
}
export const userUpdateStub = (): UserStub => {
    return {
        fullname: 'dl_user__1',
        birthdate: new Date('04.04.1992'),
        country: 'Ukraine',
        state: 'Ternopil',
        address: 'Ternopil',
        experience: '1 years',
        language: ELanguage.EN,
    }
}
