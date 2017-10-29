'use strict';

import ApplicationView from './views/application-view/application-view.js';
import MenuView from './views/menu-view/menu-view.js';
import AboutView from './views/about-view/about-view.js';
import ProfileView from './views/profile-view/profile-view.js';
import GameView from './views/game-view/game-view.js';
import SignupView from './views/signup-view/signup-view.js';
import SigninView from './views/signin-view/signin-view.js';
import SignoutView from './views/signout-view/signout-view.js';
import UserService from './services/user-service.js';
import Router from './modules/router.js';

import './blocks/form/index.css';
import './styles.css';

const userService = new UserService();
const application = new ApplicationView(document.body);

const router = new Router(application.getElement(), application.getViewsContainerElement());

router.addCallback((route) => {
    const logo = document.getElementById('logo');
    if (route === '/game') {
        logo.style.display = 'none';
    }
    else {
        logo.style.display = 'block';
    }
});
// const Inform = Array
//     .from(document.getElementsByClassName('signin-view__form signin-form-js'))
//     .forEach(elem => (elem.addEventListener('input', function (event) {
//         console.log(elem);
//         if (event.target === login && login.value.length < 4) {
//             const logininput = document.createElement('div');
//             console.log(logininput)
//             logininput.innerHTML = 'Длина < 4';
//         }
//     })));





router
    .register('/', MenuView)
    .register('/about', AboutView)
    .register('/game', GameView)
    .register('/profile', ProfileView)
    .register('/login', SigninView)
    .register('/signup', SignupView)
    .register('/logout', SignoutView)
    .start();
// const login = (document.getElementsByName('password'))[0];
// const Inform = document.querySelector('.signin-form-js');
// console.log(login, Inform);
// Inform.addEventListener('input', function (event) {
//     event.preventDefault();
//     if (event.target === login && login.value.length < 4) {
//         const logininput = document.createElement('div');
//         console.log(logininput)
//         logininput.innerHTML = 'Длина < 4';
//         login.appendChild(logininput);
//     }
// });
// const Inform = Array
//     .from(document.getElementsByClassName('signin-view__form signin-form-js'))
//     .forEach(elem => (elem.addEventListener('input', function (event) {
//         console.log(elem);
//         if (event.target === login && login.value.length < 4) {
//             const logininput = document.createElement('div');
//             console.log(logininput)
//             logininput.innerHTML = 'Длина < 4';
//         }
//     })));

userService
    .getData(true)
    .catch(() => {});
