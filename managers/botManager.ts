import {createClient} from 'oicq'
import {config} from './configManager'

export const bot = createClient(config.account.qq)
bot.login(config.account.passwd)
