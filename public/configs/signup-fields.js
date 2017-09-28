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
            pattern: '^\\S{2,}$',
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
