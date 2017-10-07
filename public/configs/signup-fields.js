'use strict';
const patternPassword = '\\S{4,}';
const patternLogin = '^\\d{0,}\\w{1,}$';

const cssBlock = 'singup__';
const signupFields = [
    {
        attrs: {
            type: 'text',
            name: 'login',
            placeholder: 'Введите ваш Login',
            required: 'required',
            pattern: patternLogin,
            title: 'Логин может содержать только цифры и буквы английского алфавита'
        },
    },
    {

        attrs: {
            type: 'email',
            name: 'email',
            placeholder: 'Введите ваш E-Mail',
            required: 'required',
        },
    },
    {
        attrs: {
            type: 'password',
            name: 'password',
            placeholder: 'Введите пароль',
            required: 'required',
            pattern: patternPassword,
            title: 'Пароль должен содержать минимум 4 символа',
        },
    },
    {
        attrs: {
            type: 'submit',
            value: 'Зарегистрироваться',
            class: [cssBlock + 'input'],
        },
    },
];
export default signupFields;
