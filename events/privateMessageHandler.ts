import {Client, PrivateMessageEventData} from 'oicq'

const handler = (data: PrivateMessageEventData) => {

}

export const attachPrivateMessageHandler = (bot: Client) => bot.on('message.private', handler)
