import {MemberInfo} from 'oicq'
import {User} from '../types/user'
import {getUser, updateUser} from '../managers/storageManager'
import {getGradeByEnrollment, getProperNameCardByUser} from './userUtils'
import {parseBranch, parseEnrollment, parseJunior, parseNick} from './nameCardParser'
import log from './log'
import {CURRENT_YEAR} from '../maps/enrollments'
import sleep from './sleep'
import {bot} from '../managers/botManager'
import {config} from '../managers/configManager'

//返回是否已更新数据库或者群名片
export default async (member: MemberInfo, user?: User): Promise<boolean> => {
    let card = member.card
    if (!card)
        card = member.nickname
    if (!user)
        user = await getUser(member.user_id)
    //彩色群名片
    if (card.startsWith('<') && card.includes('>')) {
        const index = card.lastIndexOf('>')
        card = card.substr(index + 1).trim()
    }

    if (card === getProperNameCardByUser(user))
        return false

    let changeReport = ''
    //校区
    const branch = parseBranch(card)
    if (branch !== user.branch) {
        changeReport += '\n校区: ' + (user.branch ? '金阊' : '本部') + ' -> ' + (branch ? '金阊' : '本部')
        user.branch = branch
    }
    user.junior = parseJunior(card)
    const enrollment = parseEnrollment(card)
    if (enrollment !== user.enrollment) {
    // if (enrollment && (user.enrollment < 1970 || user.enrollment > CURRENT_YEAR)) {
        changeReport += '\n年级: ' + getGradeByEnrollment(user.enrollment) + ' -> ' + getGradeByEnrollment(enrollment)
        user.enrollment = enrollment
    }
    user.nick = parseNick(card)
    if (!user.nick)
        user.nick = member.nickname

    if (changeReport) {
        log.trace(`${member.card}/${member.nickname}/${member.user_id}` + changeReport)
    }

    const properCard = getProperNameCardByUser(user)
    if (properCard !== member.card) {
        log.trace(member.card + ' -> ' + properCard)
        await bot.setGroupCard(config.groups.main, member.user_id, properCard)
        await sleep(2000)
    }
    await updateUser(user)
    return true
}
