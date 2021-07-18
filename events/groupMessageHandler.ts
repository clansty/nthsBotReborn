import {Client, GroupMessageEventData} from 'oicq'

const handler = (data: GroupMessageEventData) => {

}

export const attachGroupMessageHandler = (bot: Client) => bot.on('message.group.normal', handler)
