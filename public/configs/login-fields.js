//(function () {
'use strict';

const cssBlock = 'login__';

const loginFields = [
    {
        attrs: {
            type: 'email',
            name: 'email',
            placeholder: 'Введите ваш E-Mail',
            required: 'required',
        },
        classes: [cssBlock+'input']
    },
    {
        attrs: {
            type: 'password',
            name: 'password',
            placeholder: 'Введите пароль',
            required: 'required',
        },
        classes: [cssBlock+'input']
    },
    {
        attrs: {
            type: 'submit',
            value: 'Войти',
        },
    },
];
export default loginFields;
//})();
