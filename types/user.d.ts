import {Role} from './Role'

type User = {
    id: number
    name: string
    nick: string
    enrollment: number
    junior: boolean
    prefix?: string
    role: Role
    branch: boolean
}
