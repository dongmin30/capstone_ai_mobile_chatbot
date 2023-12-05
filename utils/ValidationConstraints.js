import { validate } from 'validate.js'

export const validateString = (id, value) => {
    if(id === 'fullName') {
        id = '이름';
    }

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
    if(id === 'email') {
        id = '이메일';
    }


    const constraints = {
        presence: {
            allowEmpty: false,
            message: '은 비어 있는 값을 넣을 수 없습니다.',
        },
    }

    if (value !== '') {
        constraints.email = {
            message: '형식이 올바르지 않습니다.'
        }
    }

    const validationResult = validate({ [id]: value }, { [id]: constraints })
    return validationResult && validationResult[id]
}

export const validatePassword = (id, value) => {
    if(id === 'password') {
        id = '비밀번호';
    }

    const constraints = {
        presence: {
            allowEmpty: false,
            message: '는 비어 있는 값을 넣을 수 없습니다.',
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
