import {bot} from '../managers/botManager'
import {config} from '../managers/configManager'
import {MemberInfo} from 'oicq'
import checkMemberData from '../utils/checkMemberData'
import log from '../utils/log'

export default async () => {
    const membersMap = await bot.getGroupMemberList(config.groups.main)
    if (!membersMap.data) {
        console.log('取群成员列表失败')
    }
    const values = membersMap.data.values()
    let iter: IteratorResult<MemberInfo, MemberInfo> = values.next()
    let count = 0
    while (!iter.done) {
        if (await checkMemberData(iter.value)) count++
        iter = values.next()
    }
    log.info(count + ' 人信息已更新')
}
