import {FriendAddEventData, Client} from 'oicq'

/**
 * @this Client
 * @param data
 */
function handler(data: FriendAddEventData) {
    this.setFriendAddRequest(data.flag, true)
}

export const attachAddFriendHandler = (bot: Client) => bot.on('request.friend.add', handler)
