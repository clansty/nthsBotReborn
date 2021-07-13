import {config} from './managers/configManager'
import {bot} from './managers/botManager'
import {version} from './package.json'
import {init as initStorage} from './managers/storageManager'

(async()=>{
    await initStorage()
    console.log(`${version} 已启动`)
})()
