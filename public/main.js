'use strict';

import ApplicationView from './views/application-view/application-view.js';
import MenuView from './views/menu-view/menu-view.js';
import AboutView from './views/about-view/about-view.js';
import ScoreboardView from './views/scoreboard-view/scoreboard-view.js';
import ProfileView from './views/profile-view/profile-view.js';
import MultiPlayerView from './views/game-view/multiplayer-view.js';
import SingleplayerView from './views/game-view/singleplayer-view.js';
import SignupView from './views/signup-view/signup-view.js';
import SigninView from './views/signin-view/signin-view.js';
import SignoutView from './views/signout-view/signout-view.js';
import UserService from './services/user-service.js';
import Router from './modules/router.js';

import './blocks/form/index.styl';
import './styles.styl';
import './views/application-view/application.styl';

const Background = document.createElement('div');
Background.setAttribute('class', 'background__img');
document.body.appendChild(Background);

const userService = new UserService();
const application = new ApplicationView(document.body);

const router = new Router(application.getElement(), application.getViewsContainerElement());

router.addCallback((route) => {
    const logo = document.getElementById('logo');
    if (route === '/multiplayer' || route === '/singleplayer') {
        logo.style.display = 'none';
    } else {
        logo.style.display = 'block';
    }
});

let img1 = new Image();
let img = new Image();
img1.src = './img/cards-sm-monster.png';
img.src = './img/cards-lg-monster.png';

router
    .register('/', MenuView)
    .register('/about', AboutView)
    .register('/profile', ProfileView)
    .register('/multiplayer', MultiPlayerView)
    .register('/singleplayer', SingleplayerView)
    .register('/login', SigninView)
    .register('/score', ScoreboardView)
    .register('/signup', SignupView)
    .register('/logout', SignoutView);
// .start();

userService
    .getData(true)
    .catch((err) => {
        return err;
    });
