import { validate } from 'validate.js'

export const validateString = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
            message: "은(는) 비어 있는 값을 넣을 수 없습니다.",
        },
    }

    if (value !== '') {
        constraints.format = {
            pattern: '.+',
            flags: 'i',
            message: "은(는) 비어 있는 값을 넣을 수 없습니다                                                                                                                                                                                                                                                                                   ",
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateEmail = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
            message: '이메일은 비어 있는 값을 넣을 수 없습니다.',
        },
    }

    if (value !== '') {
        constraints.email = {
            message: '이메일 형식이 올바르지 않습니다.'
        }
    }

    const validationResult = validate({ [id]: constraints })
    return validationResult && validationResult[id]
}

export const validatePassword = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
            message: '비밀번호는 비어 있는 값을 넣을 수 없습니다.',
        },
    }

    if (value !== '') {
        constraints.length = {
            minimum: 6,
            message: '비밀번호는 6자 이상이여야합니다.',
        }
    }

    const validationResult = validate({ [id]: constraints })
    return validationResult && validationResult[id]
}
