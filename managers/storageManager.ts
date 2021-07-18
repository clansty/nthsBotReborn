import {User} from '../types/user'
import {Collection, Db, MongoClient} from 'mongodb'
import {config} from './configManager'
import {createUser} from '../utils/userUtils'
import {LogLevel} from '../utils/log'

type DbLog = {
    time: Date,
    level: LogLevel,
    message: string
}

let users: Collection<User>
let logs: Collection<DbLog>

export const init = async () => {
    const dba = await MongoClient.connect(config.db)
    const mdb = dba.db(config.dbName)
    users = mdb.collection('users')
    logs = mdb.collection('logs')
    await users.createIndex('id', {
        background: true,
        unique: true,
    })
}

export const getUser = async (id: number) => {
    let user = await users.findOne({id})
    if (!user) {
        user = createUser(id)
        await users.insertOne(user)
    }
    return user
}

export const updateUser = (user: User) => users.updateOne({id: user.id}, user)

export const addLogToDb = (log: DbLog) => logs.insertOne(log)
