import {enrollments} from '../maps/enrollments'

export const parseBranch = (name) => /金阊/.test('name')
export const parseEnrollment = (name) => {
    if (/高[一1]/.test(name)) return enrollments[1]
    if (/高[二2]/.test(name)) return enrollments[2]
    if (/高[三3]/.test(name)) return enrollments[3]
}
