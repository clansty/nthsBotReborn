import {CURRENT_YEAR, ENROLLMENTS} from '../maps/enrollments'

const YEAR_OF_LAST_JUNIOR = 2017

export const parseBranch = (name: string) => /金阊/.test(name)
export const parseEnrollment = (name: string): number => {
    if (/高[一1]/.test(name)) return ENROLLMENTS[1]
    if (/高[二2]/.test(name)) return ENROLLMENTS[2]
    if (/高[三3]/.test(name)) return ENROLLMENTS[3]
    if (/(\d{2,4}) *届/.test(name)) {
        let graduate = Number(/(\d{2,4}) *届/.exec(name)[1])
        if (graduate < CURRENT_YEAR + 4 - 2000)
            graduate += 2000
        return graduate - 3
    }
    if (/(\d{2,4}) *级?/.test(name)) {
        let enrollment = Number(/(\d{2,4}) *级?/.exec(name)[1])
        if (enrollment < CURRENT_YEAR + 1 - 2000)
            enrollment += 2000
        return enrollment
    }
    return 0
}
export const parseJunior = (name: string) => /届初中/.test(name) && parseEnrollment(name) < YEAR_OF_LAST_JUNIOR
export const parseNick = (name: string) => {
    name = name.replace(/[丨｜]/g, ' | ')
    const index = name.lastIndexOf('|')
    if (index)
        return name.substr(index + 1).trim()
    return name.trim()
}
