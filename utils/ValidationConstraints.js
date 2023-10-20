import { validate } from 'validate.js'

export const validateString = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.format = {
            pattern: '.+',
            flags: 'i',
            message: "비어 있는 값을 넣을 수 없습니다.",
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validateEmail = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.email = true
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validatePassword = (id, value) => {
    const constraints = {
        presence: {
            allowEmpty: false,
        },
    }

    if (value !== '') {
        constraints.length = {
            minimum: 6,
            message: '는 6자 이상이여야합니다.',
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}
