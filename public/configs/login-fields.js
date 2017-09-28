'use strict';

//const cssBlock = 'login__';

const loginFields = [
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
            type: 'password',
            name: 'password',
            placeholder: 'Введите пароль',
            required: 'required',
        },
        //classes: [cssBlock+'input']
    },
    {
        attrs: {
            type: 'submit',
            value: 'Войти',
        },
    },
];
export default loginFields;
