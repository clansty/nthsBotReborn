import {bot} from './managers/botManager'
import {version} from './package.json'
import {init as initStorage} from './managers/storageManager'
import {attachInviteGroupHandler} from './events/inviteGroupHandler'
import {attachAddFriendHandler} from './events/addFriendHandler'
import {attachGroupMessageHandler} from './events/groupMessageHandler'
import {attachPrivateMessageHandler} from './events/privateMessageHandler'
import scanMembers from './modules/scanMembers'
import {attachAddGroupHandler} from './events/addGroupHandler'

(async () => {
    await initStorage()
    attachInviteGroupHandler(bot)
    attachAddFriendHandler(bot)
    attachGroupMessageHandler(bot)
    attachPrivateMessageHandler(bot)
    attachAddGroupHandler(bot)
    console.log(`${version} 已启动`)

    setInterval(scanMembers, 1000*60*60)
})()
