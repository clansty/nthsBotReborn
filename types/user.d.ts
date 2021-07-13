import {Status} from './Status'
import {Role} from './Role'

type User = {
    id: number
    name: string
    nick: string
    enrollment: number
    junior: boolean
    prefix?: string
    step: number
    status: Status
    role: Role
}
