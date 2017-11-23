'use strict';

export function validate(form, selector) {
    let password;
    if (selector === document.querySelector('.signin-form-js'))
        password = document.getElementById('Signin');
    else {
        password = document.getElementById('Signup');
    }
    // if (window.id === undefined) {//Первый раз нажимаю на форму входа, заходит сюда
    //     password = Arraypassword[0];
    //     //window.count = 0;
    //     window.id = selector;
    //     console.log(window.id, selector, password, Arraypassword);
    // }
    // if (window.id != selector) {//Затем нажимаю на лого, Второй раз нажимаю на форму и заходит сюда. Почему он считает window.id и selector разными, несмотря на то, что у них одинаковые значения, и как сделать так, чтобы они были одинаковыми?
    //     console.log(window.id, selector);
    //     //window.id = selector;
    //     window.count = +1;
    //     password = Arraypassword[(window.count % 2)];
    //     console.log(password);
    // }
    const passwordinput = form.querySelector('.password-validate');
    passwordinput.innerHTML = 'Must be more than 4 symbols';
    const Arraylogin = document.getElementsByName('login');
    var login = Arraylogin[0];
    if (Arraylogin.length > 1) {
        login = Arraylogin[1];
    }
    form.addEventListener('input', function (event) {
        event.preventDefault();
        if (event.target === password && password.value.length >= 4) {
            passwordinput.style.color = 'aquamarine';
            passwordinput.parentElement.style.borderColor = '#32cd32';
            passwordinput.innerHTML = 'Done!';
        }
    });
    form.addEventListener('change', function (event) {
        event.preventDefault();
        if (event.target === password && password.value.length < 4) {
            passwordinput.style.color = 'lightcoral';
            passwordinput.parentElement.style.borderColor = 'lightcoral';
            passwordinput.innerHTML = 'Too short!';
        }
        if (event.target !== password && password.value.length >= 4) {
            passwordinput.style.color = 'aquamarine';
        }
    });
}
