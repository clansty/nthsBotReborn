import {bot} from './managers/botManager'
import {version} from './package.json'
import {init as initStorage} from './managers/storageManager'
import {attachInviteGroupHandler} from './events/inviteGroupHandler'
import {attachAddFriendHandler} from './events/addFriendHandler'
import {attachGroupMessageHandler} from './events/groupMessageHandler'
import {attachPrivateMessageHandler} from './events/privateMessageHandler'
import scanMembers from './modules/scanMembers'

(async () => {
    await initStorage()
    attachInviteGroupHandler(bot)
    attachAddFriendHandler(bot)
    attachGroupMessageHandler(bot)
    attachPrivateMessageHandler(bot)
    console.log(`${version} 已启动`)

    setTimeout(scanMembers, 10000)
})()
