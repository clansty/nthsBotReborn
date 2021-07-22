import {User} from '../types/user'
import {getGradeByEnrollment} from './userUtils'

export default (user: User) => {
    const str = `QQ: ${user.id}
昵称: ${user.nick}
姓名: ${user.name}
入学年份: ${user.enrollment}
年级: ${getGradeByEnrollment(user.enrollment)}
初中: ${user.junior}
校区: ${user.branch ? '金阊' : '本部'}`

    return str
}
