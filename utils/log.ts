import {addLogToDb} from '../managers/storageManager'
import {bot} from '../managers/botManager'
import {config} from '../managers/configManager'
import {MessageElem} from 'oicq'

export type LogLevel = 'trace' | 'info' | 'error'

export default {
    info(message: string) {
        addLogToDb({
            message,
            time: new Date(),
            level: 'info',
        })
        bot.sendGroupMsg(config.groups.log, message, true)
    },
    trace(message: string) {
        addLogToDb({
            message,
            time: new Date(),
            level: 'trace',
        })
    },
    err(message: string) {
        addLogToDb({
            message,
            time: new Date(),
            level: 'error',
        })
        bot.sendGroupMsg(config.groups.log, [
            {
                type: 'text',
                data: {
                    text: message,
                },
            },
            {
                type: 'at',
                data: {
                    qq: 'all',
                },
            }] as MessageElem[])
    },
}
