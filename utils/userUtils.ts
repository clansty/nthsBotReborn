import {User} from '../types/user'
import {Role} from '../types/Role'
import {Status} from '../types/Status'

export const createUser = (id: number): User => ({
    id,
    enrollment: 0,
    junior: false,
    name: '',
    nick: '',
    role: Role.normal,
    status: Status.none,
    step: 0,
    branch: false,
})

export const getGradeByEnrollment = (enr: number) => {
    if (enr === 2021) return '高一'
    if (enr === 2020) return '高二'
    if (enr === 2019) return '高三'
    if (enr < 1970 || enr > 2021) return '未知'
    return (enr + 3) + '届'
}

export const getPrefixByUser = (user: User) => {
    if (user.prefix) return user.prefix
    let prefix = ''
    if (user.role == Role.powerUser) prefix = 'A管理员'
    if (user.branch) prefix += '金阊'
    if (user.junior)
        prefix += (user.enrollment + 3) + '届初中'
    else
        prefix += getGradeByEnrollment(user.enrollment)

    return prefix
}
