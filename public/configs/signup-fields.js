//(function () {
'use strict';

const signupFields = [
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
            placeholder: 'Придумайте пароль длиннее 4 символов',
            required: 'required',
            pattern: '^\\S{4,}$',
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
//})();
