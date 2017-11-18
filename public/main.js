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

const loader = document.createElement('div');
const back = document.createElement('div');
loader.setAttribute('class', 'loader');
back.setAttribute('class', 'background-loader');
document.body.appendChild(back);
back.appendChild(loader);

function loaderOut() {
    loader.style.display = 'none';
    back.style.display= 'none';
}

window.onload = () => {
    setTimeout(loaderOut, 3000);
    const userService = new UserService();

    const application = new ApplicationView(document.body);
    //loader.style.display = 'none';
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

    router
        .register('/', MenuView)
        .register('/about', AboutView)
        .register('/game', GameView)
        .register('/profile', ProfileView)
        .register('/login', SigninView)
        .register('/signup', SignupView)
        .register('/logout', SignoutView)
        .start();

    userService
        .getData(true)
        .catch(() => {
        });
};
