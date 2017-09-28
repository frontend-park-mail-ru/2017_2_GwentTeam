'use strict';
const patternPassword = '^\\d{2,}\\w{2,}$';
const patternLogin = '^\\d{0,}\\w{1,}$';
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
            title: 'Пароль должен содержать минимум 2 цифры и 2 буквы',
        },
    },
    {
        attrs: {
            type: 'submit',
            value: 'Зарегистрироваться',
        },
    },
];
export default signupFields;
