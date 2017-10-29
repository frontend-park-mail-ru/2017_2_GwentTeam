'use strict';

export function validate() {
    const passwordinput = document.querySelectorAll('.password-validate');
    passwordinput.innerHTML = 'Must be more than 4 symbols';
    const Inform = document.querySelector('.signin-form-js');
    const Upform = document.querySelector('.signup-form-js');
    if (Inform && !Upform) {
        const Inpassword = (document.getElementsByName('password'))[0];
        const Inlogin = (document.getElementsByName('login'))[0];
        const Uppassword = (document.getElementsByName('password'))[1];
        const Uplogin = (document.getElementsByName('login'))[1];
    }
    if (Upform && !Inform) {
        const Uppassword = (document.getElementsByName('password'))[0];
        const Uplogin = (document.getElementsByName('login'))[0];
        const Inpassword = (document.getElementsByName('password'))[1];
        const Inlogin = (document.getElementsByName('login'))[1];
    }
    Inform.addEventListener('input', function (event) {
        event.preventDefault();
        //password.appendChild(passwordinput);
        if (event.target === Inpassword && Inpassword.value.length >= 4) {
            passwordinput.style.color = 'aquamarine';
            passwordinput.parentElement.style.borderColor = '#32cd32';
            passwordinput.innerHTML = 'Done!';
        }
    });
    Inform.addEventListener('change', function (event) {
        event.preventDefault();
        if (event.target === Inpassword && Inpassword.value.length < 4) {
            passwordinput.style.color = 'lightcoral';
            passwordinput.parentElement.style.borderColor = 'lightcoral';
            passwordinput.innerHTML = 'Too short!';
        }
        if (event.target === login && Inpassword.value.length >= 4) {
            passwordinput.style.color = 'aquamarine';
            console.log('kuku');
        }
    });
    Upform.addEventListener('input', function (event) {
        event.preventDefault();
        //password.appendChild(passwordinput);
        if (event.target === Uppassword && Uppassword.value.length >= 4) {
            passwordinput.style.color = 'aquamarine';
            passwordinput.parentElement.style.borderColor = '#32cd32';
            passwordinput.innerHTML = 'Done!';
        }
    });
    Upform.addEventListener('change', function (event) {
        event.preventDefault();
        if (event.target === Uppassword && Uppassword.value.length < 4) {
            passwordinput.style.color = 'lightcoral';
            passwordinput.parentElement.style.borderColor = 'lightcoral';
            passwordinput.innerHTML = 'Too short!';
        }
        if (event.target === login && Uppassword.value.length >= 4) {
            passwordinput.style.color = 'aquamarine';
            console.log('kuku');
        }
    });
}
