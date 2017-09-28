'use strict';

const signupFields = [
    {
        attrs: {
            type: 'text',
            name: 'login',
            placeholder: 'Введите ваш Login',
            required: 'required',
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
            pattern: '^\\d{2,}\\w{2,}$',
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
