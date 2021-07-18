import {enrollments} from '../maps/enrollments'

const YEAR_OF_LAST_JUNIOR = 2017

export const parseBranch = (name: string) => /金阊/.test(name)
export const parseEnrollment = (name: string) => {
    if (/高[一1]/.test(name)) return enrollments[1]
    if (/高[二2]/.test(name)) return enrollments[2]
    if (/高[三3]/.test(name)) return enrollments[3]
}
export const parseJunior = (name: string) => /届初中/.test(name) && parseEnrollment(name) < YEAR_OF_LAST_JUNIOR
export const parseNick = (name: string) => {
    name = name.replace(/[丨｜]/g, ' | ')
    const index = name.lastIndexOf('|')
    if (index)
        return name.substr(index + 1).trim()
    return name.trim()
}
