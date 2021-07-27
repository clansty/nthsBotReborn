import {GroupMessageEventData} from 'oicq'

const BREAK = '打断'
const DOUBLE_BREAK = '出现了打断怪！'

let lastMsg = ''
let count = 0

export default ({raw_message, reply}: GroupMessageEventData) => {
    if (raw_message !== lastMsg) {
        lastMsg = raw_message
        count = 1
    } else {
        count++
        if (count === 4) {
            const message = lastMsg === BREAK ? DOUBLE_BREAK : BREAK
            reply(message)
            lastMsg = message
            count = 1
        }
    }
}
