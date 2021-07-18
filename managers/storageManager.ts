import {User} from '../types/user'
import {Collection, MongoClient} from 'mongodb'
import {config} from './configManager'
import {createUser} from '../utils/userUtils'

let users: Collection<User>

export const init = async () => {
    const dba = await MongoClient.connect(config.db)
    const mdb = dba.db(config.dbName)
    users = mdb.collection('users')
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
