'use strict';

export function validate(form, selector) {
    let password;
    if (selector === document.querySelector('.signin-form-js'))
        password = document.getElementById('Signin');
    else {
        password = document.getElementById('Signup');
    }
    const passwordinput = form.querySelector('.password-validate');
    passwordinput.innerHTML = 'Must be more than 4 symbols';
    // const Arraylogin = document.getElementsByName('login');
    // let login = Arraylogin[0];
    // if (Arraylogin.length > 1) {
    //     login = Arraylogin[1];
    // }
    form.addEventListener('input', (event) => {
        event.preventDefault();
        if (event.target === password && password.value.length >= 4) {
            //passwordinput.style.color = 'aquamarine';
            passwordinput.parentElement.style.borderColor = '#32cd32';
            passwordinput.innerHTML = 'Done!';
        }
    });
    form.addEventListener('change', (event) => {
        event.preventDefault();
        if (event.target === password && password.value.length < 4) {
            passwordinput.style.color = 'lightcoral';
            passwordinput.parentElement.style.borderColor = 'lightcoral';
            passwordinput.innerHTML = 'Too short!';
        }
        if (event.target !== password && password.value.length >= 4) {
            //passwordinput.style.color = 'aquamarine';
        }
    });
}
