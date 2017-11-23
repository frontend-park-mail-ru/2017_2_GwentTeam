'use strict';

import ApplicationView from './views/application-view/application-view.js';
import MenuView from './views/menu-view/menu-view.js';
import AboutView from './views/about-view/about-view.js';
import ProfileView from './views/profile-view/profile-view.js';
import GameView from './views/game-view/game-view.js';
import SingleplayerView from './views/game-view/singleplayer-view.js';
import SignupView from './views/signup-view/signup-view.js';
import SigninView from './views/signin-view/signin-view.js';
import SignoutView from './views/signout-view/signout-view.js';
//import TrainingView from './views/training-view/training-view.js';
import UserService from './services/user-service.js';
import Router from './modules/router.js';

//import ServiceWorker from './service-worker.js';

import './blocks/form/index.styl';
import './styles.styl';

const userService = new UserService();
const application = new ApplicationView(document.body);

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./service-worker.js', {scope: '/'});

}

const router = new Router(application.getElement(), application.getViewsContainerElement());

router.addCallback((route) => {
    const logo = document.getElementById('logo');
    if (route === '/game' || route === '/singleplayer') {
        logo.style.display = 'none';
    } else {
        logo.style.display = 'block';
    }
});

router
    .register('/', MenuView)
    .register('/about', AboutView)
    .register('/game', GameView)
    .register('/profile', ProfileView)
    .register('/singleplayer', SingleplayerView)
    .register('/login', SigninView)
    .register('/signup', SignupView)
    .register('/logout', SignoutView)
    .start();

userService
    .getData(true)
    .catch(() => {});
