import {Client, GroupAddEventData, segment} from 'oicq'
import {config} from '../managers/configManager'
import {parseEnrollment} from '../utils/nameCardParser'
import {bot} from '../managers/botManager'
import {getUser, updateUser} from '../managers/storageManager'
import stringifyUser from '../utils/stringifyUser'
import log from '../utils/log'

const APPLY_MSG_REGEX = /.* +([\u4E00-\u9FA5]{2,4})/

const handler = async (data: GroupAddEventData) => {
    if (data.group_id !== config.groups.main) return
    const msg = data.comment
    if (APPLY_MSG_REGEX.test(msg)) {
        const enrollment = parseEnrollment(msg)
        const name = APPLY_MSG_REGEX.exec(msg)[1]
        const user = await getUser(data.user_id)
        if (!enrollment) {
            log.info('已拒绝加群申请：\n' + msg)
            await bot.setGroupAddRequest(data.flag, false, '年级格式错误', false)
            return
        }
        user.name = name
        user.enrollment = enrollment
        updateUser(user)
        bot.sendGroupMsg(config.groups.admin, [segment.text('加群申请：\n' + stringifyUser(user)),
            segment.mirai(JSON.stringify({nthsBot: {flag: data.flag}}, null, 0))])
    } else {
        log.info('已拒绝加群申请：\n' + msg)
        await bot.setGroupAddRequest(data.flag, false, '回答格式错误', false)
    }
}

export const attachAddGroupHandler = (bot: Client) => bot.on('request.group.add', handler)
