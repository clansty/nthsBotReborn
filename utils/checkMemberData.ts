import {MemberInfo} from 'oicq'
import {User} from '../types/user'
import {bot} from '../managers/botManager'
import {config} from '../managers/configManager'
import {getUser} from '../managers/storageManager'
import {getProperNameCardByUser} from './userUtils'
import {parseBranch} from './nameCardParser'

//返回是否已更新数据库或者群名片
export default async (member: MemberInfo, user?: User): boolean => {
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
        changeReport += '校区: ' + (user.branch ? '金阊' : '本部') + ' -> ' + (branch ? '金阊' : '本部')
        user.branch = branch
    }

}
