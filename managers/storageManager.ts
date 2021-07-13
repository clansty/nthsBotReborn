import {User} from '../types/user'
import {Collection, MongoClient} from 'mongodb'
import {config} from './configManager'

let users: Collection<User>

export const init=async()=>{
    const dba = await MongoClient.connect(config.db)
    const mdb = dba.db(config.dbName)
    users = mdb.collection('msgIds')
}

export const getUser=async(id:number)=>{
    return await users.findOne({id})
}
