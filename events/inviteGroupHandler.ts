import {Client, GroupInviteEventData} from 'oicq'

/**
 * @this Client
 * @param data
 */
function handler(data: GroupInviteEventData) {
    this.setGroupAddRequest(data.flag, true)
}

export const attachInviteGroupHandler = (bot: Client) => bot.on('request.group.invite', handler)
