import {Client, GroupMessageEventData} from 'oicq'
import {config} from '../managers/configManager'
import antiRepeater from '../modules/antiRepeater'

const handler = (data: GroupMessageEventData) => {
    if(data.group_id===config.groups.main){
        antiRepeater(data)
    }
}

export const attachGroupMessageHandler = (bot: Client) => bot.on('message.group.normal', handler)
