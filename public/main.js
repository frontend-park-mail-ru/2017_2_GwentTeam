'use strict';

import ApplicationView from './views/application-view/application-view.js';
import MenuView from './views/menu-view/menu-view.js';
import AboutView from './views/about-view/about-view.js';
import ProfileView from './views/profile-view/profile-view.js';
import GameView from './views/game-view/game-view.js';
import SignupView from './views/signup-view/signup-view.js';
import SigninView from './views/signin-view/signin-view.js';
import SignoutView from './views/signout-view/signout-view.js';
import EventBus from './modules/event-bus.js';
import UserService from './services/user-service.js';
import Router from './modules/router.js';

const bus = new EventBus();
const userService = new UserService();
const application = new ApplicationView(document.body);

const router = new Router(application.getElement(), application.getViewsContainerElement());
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
    .catch(function (error) {
// ignore
    });




// const userService = new UserService();
// const app = new Block(document.getElementById('application'));
// const title =  new Block('div', {}, ['app__logo']);
// const sections = {
//     menu: new Block('section', {}, ['main__menu']),
//     login: new Block('section', {}, ['login-section']),
//     game: new Block('section', {}, ['game-section']),
//     signup: new Block('section', {}, ['signup-section']),
//     about: new Block('section', {}, ['about-section']),
//     profile-view: new Block('section', {}, ['profile-view-section']),
//     logout: new Block('section', {}, ['logout-section']),
// };
//
// function sectionsHide() {
//     Object.keys(sections).forEach((sectionKey) => {
//         const section = sections[sectionKey];
//         section.hide();
//     });
// }
// app.append(title);
// Object.keys(sections).forEach((sectionKey) => {
//     const section = sections[sectionKey];
//     app.append(section);
// });
// sectionsHide();
// sections.menu.show();
//
// function openGame() {
//     if (!sections.game.ready) {
//         sections.game.gamefield = new Block('h1', {}, ['main__menu'], 'В разработке');
//         sections.game
//             .append(sections.game.gamefield);
//     }
//     sectionsHide();
//     sections.game.show();
//
//     sections.game.ready = true;
// }
//
// function openAbout() {
//     if (!sections.about.ready) {
//         sections.about.aboutfield = new Block('h1', {}, ['main__menu'], 'Правила игры, разработчики');
//         sections.about
//             .append(sections.about.aboutfield);
//         sections.about.ready = true;
//     }
//     sectionsHide();
//     sections.about.show();
// }
//
// function onSubmitLoginForm(formdata) {
//     return userService
//         .login(formdata.login, formdata.password)
//         .then (() => userService.getData(true))
//         .then(() => {
//             sections.login.loginform.reset();
//             openMenu();
//         })
//         .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
// }
//
// function openLogin() {
//     if (!sections.login.ready) {
//         sections.login.loginform = new Form(loginFields);
//         sections.login.loginform.onSubmit(onSubmitLoginForm);
//         sections.login
//             .append(new Block('h2', {}, [], 'Вход'))
//             .append(sections.login.loginform);
//         sections.login.ready = true;
//     }
//     sectionsHide();
//     if (userService.isLoggedIn()) {
//         return openMenu();
//     }
//     sections.login.show();
// }
//
// function onSubmitSingUpForm (formdata) {
//     return userService
//         .signup(formdata.login, formdata.email, formdata.password)
//         .then((data) => {
//             const response = data[0];
//             const body = data[1];
//
//             console.log(response.status, body.message);
//         })
//         .then(() => {
//             sections.signup.signupform.reset();
//             openMenu();
//         })
//         .catch((err) => alert(`Some error ${err.status}: ${err.message}`));
// }
//
// function openSignup() {
//     if (!sections.signup.ready) {
//         sections.signup.signupform = new Form(signupFields);
//         sections.signup.signupform.onSubmit(onSubmitSingUpForm);
//         sections.signup
//             .append(new Block('h2', {}, [], 'Регистрация'))
//             .append(sections.signup.signupform);
//         sections.signup.ready = true;
//     }
//     sectionsHide();
//     if (userService.isLoggedIn()) {
//         return openMenu();
//     }
//     sections.signup.show();
// }
//
// function openProfile() {
//     if (!sections.profile-view.ready) {
//         sections.profile-view.profile-view = new Profile();
//         sections.profile-view
//             .append(new Block('h2', {}, [], 'Мой профиль'))
//             .append(sections.profile-view.profile-view);
//         sections.profile-view.ready = true;
//     }
//     sectionsHide();
//     if (!userService.isLoggedIn()) {
//         return openMenu();
//     }
//     userService.getData()
//         .then((user) => {
//             sections.profile-view.profile-view.update(user);
//             sections.profile-view.show();
//         })
//         .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
// }
//
// function openLogout() {
//     userService
//         .logout()
//         .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
//     if (!userService.isLoggedIn()) {
//         return openMenu();
//     }
//
// }
//
// function openMenu() {
//     if (!sections.menu.ready) {
//
//         sections.menu.items = {
//             login: new Block('button', {'data-section': 'login'}, [], 'Вход'),
//             game: new Block('button', {'data-section': 'game'}, [], 'Играть'),
//             signup: new Block('button', {'data-section': 'signup'}, [], 'Регистрация'),
//             about: new Block('button', {'data-section': 'about'}, [], 'Об игре'),
//             profile-view: new Block('button', {'data-section': 'profile-view'}, [], 'Посмотреть мой профиль'),
//             logout: new Block('button', {'data-section': 'logout'}, [], 'Выйти')
//         };
//         sections.menu.on('click', (event) => {
//             event.preventDefault();
//             const target = event.target;
//             const section = target.getAttribute('data-section');
//             switch (section) {
//                 case 'login':
//                     openLogin();
//                     break;
//                 case 'game':
//                     openGame();
//                     break;
//                 case 'signup':
//                     openSignup();
//                     break;
//                 case 'about':
//                     openAbout();
//                     break;
//                 case 'profile-view':
//                     openProfile();
//                     break;
//                 case 'logout':
//                     openLogout();
//                     break;
//             }
//         });
//
//         sections.menu
//             .append(sections.menu.items.login)
//             .append(sections.menu.items.signup)
//             .append(sections.menu.items.game)
//             .append(sections.menu.items.about)
//             .append(sections.menu.items.profile-view)
//             .append(sections.menu.items.logout);
//         sections.menu.ready = true;
//     }
//
//     sectionsHide();
//     if (userService.isLoggedIn()) {
//         sections.menu.items.login.hide();
//         sections.menu.items.signup.hide();
//         sections.menu.items.game.show();
//         sections.menu.items.about.show();
//         sections.menu.items.profile-view.show();
//         sections.menu.items.logout.show();
//     } else {
//         sections.menu.items.login.show();
//         sections.menu.items.signup.show();
//         sections.menu.items.about.show();
//         sections.menu.items.profile-view.hide();
//         sections.menu.items.game.hide();
//         sections.menu.items.logout.hide();
//     }
//     sections.menu.show();
// }
//
// title.on('click', openMenu);
// openMenu();
//
// userService.getData()
//     .then(() => {
//         openMenu();
//     })
//     .catch((/*error*/) => {
//     });
