import fs from 'fs'
import YAML from 'yaml'

type Config={
    account:{
        /**
         * QQ号
         */
        qq:number
        /**
         * 密码
         */
        passwd: string
    }
    groups:{
        /**
         * 主群群号
         */
        main:number
        /**
         * 管理群群号
         */
        admin:number
        /**
         * 日志群
         */
        log:number
    }
    /**
     * MongoDB 连接字符串
     */
    db:string
    /**
     * 库名
     */
    dbName: string
}

export let config:Config
if (fs.existsSync('config.yaml')) {
    config = YAML.parse(fs.readFileSync('config.yaml', 'utf8'))
} else {
    console.error('配置文件不存在')
    process.exit(2)
}


