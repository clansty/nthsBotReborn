import {bot} from '../managers/botManager'
import {config} from '../managers/configManager'
import {MemberInfo} from 'oicq'
import checkMemberData from '../utils/checkMemberData'

export default async () => {
    const membersMap = await bot.getGroupMemberList(config.groups.main)
    if (!membersMap.data) {
        console.log('取群成员列表失败')
    }
    const values = membersMap.data.values()
    let iter: IteratorResult<MemberInfo, MemberInfo> = values.next()
    while (!iter.done) {
        await checkMemberData(iter.value)
        iter = values.next()
    }
}
