import {bot} from './managers/botManager'
import {version} from './package.json'
import {init as initStorage} from './managers/storageManager'
import {attachInviteGroupHandler} from './events/inviteGroupHandler'
import {attachAddFriendHandler} from './events/addFriendHandler'
import {attachGroupMessageHandler} from './events/groupMessageHandler'
import {attachPrivateMessageHandler} from './events/privateMessageHandler'

(async () => {
    await initStorage()
    attachInviteGroupHandler(bot)
    attachAddFriendHandler(bot)
    attachGroupMessageHandler(bot)
    attachPrivateMessageHandler(bot)
    console.log(`${version} 已启动`)
})()
