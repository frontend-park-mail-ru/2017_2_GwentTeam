'use strict';

import Block from '/blocks/block/index.js';
import Form from '/blocks/form/index.js';
import Profile from '/blocks/profile/index.js';
import UserService from '/services/user-service.js';
import loginFields from '/configs/login-fields.js';
import signupFields from '/configs/signup-fields.js';

const userService = new UserService();
const app = new Block(document.getElementById('application'));
const title =  Block.Create('div', {}, ['app__logo']);
const sections = {
    menu: Block.Create('section', {}, ['main__menu']),
    login: Block.Create('section', {}, ['login-section']),
    game:  Block.Create('section', {}, ['game-section']),
    signup: Block.Create('section', {}, ['signup-section']),
    about: Block.Create('section', {}, ['about-section']),
    profile: Block.Create('section', {}, ['profile-section']),
    logout: Block.Create('section', {}, ['logout-section']),
};

function sectionsHide() {
    Object.keys(sections).forEach((sectionKey) => {
        const section = sections[sectionKey];
        section.hide();
    });
}

app.append(title);
Object.keys(sections).forEach((sectionKey) => {
    const section = sections[sectionKey];
    app.append(section);
});
sectionsHide();
sections.menu.show();

function openGame() {
    if (!sections.game.ready) {
        sections.game.gamefield = Block.Create('h1', {}, ['main__menu'], 'В разработке');
        sections.game
            .append(sections.game.gamefield);
    }
    sectionsHide();
    sections.game.show();

    sections.game.ready = true;
}

function openAbout() {
    if (!sections.about.ready) {
        sections.about.aboutfield = Block.Create('h1', {}, ['main__menu'], 'Правила игры, разработчики');
        sections.about
            .append(sections.about.aboutfield);
        sections.about.ready = true;
    }
    sectionsHide();
    sections.about.show();
}

function onSubmitLoginForm(formdata) {
    return userService
        .login(formdata.login, formdata.password)
        .then(function () {
            return userService.getData(true);
        })
        .then(function () {
            sections.login.loginform.reset();
            openMenu();
        })
        .catch((err) => alert(`Some error ${err.status}: ${err.message}`));


}

function openLogin() {
    if (!sections.login.ready) {
        sections.login.loginform = new Form(loginFields);
        sections.login.loginform.onSubmit(onSubmitLoginForm);
        sections.login
            .append(Block.Create('h2', {}, [], 'Вход'))
            .append(sections.login.loginform);
        sections.login.ready = true;
    }
    sectionsHide();
    if (userService.isLoggedIn()) {
        return openMenu();
    }
    sections.login.show();
}

function onSubmitSingUpForm (formdata) {
    return userService
        .signup(formdata.login, formdata.email, formdata.password)
        .then(function(){
            sections.signup.signupform.reset();
            openMenu();
        })
        .catch((err) => alert(`Some error ${err.status}: ${err.message}`));
}

function openSignup() {
    if (!sections.signup.ready) {
        sections.signup.signupform = new Form(signupFields);
        sections.signup.signupform.onSubmit(onSubmitSingUpForm);
        sections.signup
            .append(Block.Create('h2', {}, [], 'Регистрация'))
            .append(sections.signup.signupform);
        sections.signup.ready = true;
    }
    sectionsHide();
    if (userService.isLoggedIn()) {
        return openMenu();
    }
    sections.signup.show();
}

function openProfile() {
    if (!sections.profile.ready) {
        sections.profile.profile = new Profile();
        sections.profile
            .append(Block.Create('h2', {}, [], 'Мой профиль'))
            .append(sections.profile.profile);
        sections.profile.ready = true;
    }
    sectionsHide();
    if (!userService.isLoggedIn()) {
        return openMenu();
    }
    userService.getData()
        .then(function (user) {
            sections.profile.profile.update(user);
            sections.profile.show();
        })
        .catch((err) => alert(`Some error ${err.status}: ${err.message}`));
}

function openLogout() {
    userService
        .logout()
        // .then(function () {
        //     return userService.getData(true);
        // })
        .then(function () {
            console.log('openmenu');
            return openMenu();
        })
        .catch((err) => alert(`Some error ${err.status}: ${err.message}`));
    if (!userService.isLoggedIn()) {
        return openMenu();
    }

}

function openMenu() {
    if (!sections.menu.ready) {

        sections.menu.items = {
            login: Block.Create('button', {'data-section': 'login'}, [], 'Вход'),
            game: Block.Create('button', {'data-section': 'game'}, [], 'Играть'),
            signup: Block.Create('button', {'data-section': 'signup'}, [], 'Регистрация'),
            about: Block.Create('button', {'data-section': 'about'}, [], 'Об игре'),
            profile: Block.Create('button', {'data-section': 'profile'}, [], 'Посмотреть мой профиль'),
            logout: Block.Create('button', {'data-section': 'logout'}, [], ['Выйти'])
        };
        sections.menu.on('click', function (event) {
            event.preventDefault();
            const target = event.target;
            const section = target.getAttribute('data-section');
            switch (section) {
                case 'login':
                    openLogin();
                    break;
                case 'game':
                    openGame();
                    break;
                case 'signup':
                    openSignup();
                    break;
                case 'about':
                    openAbout();
                    break;
                case 'profile':
                    openProfile();
                    break;
                case 'logout':
                    openLogout();
                    break;
            }
        });
        sections.menu
            .append(sections.menu.items.login)
            .append(sections.menu.items.signup)
            .append(sections.menu.items.game)
            .append(sections.menu.items.about)
            .append(sections.menu.items.profile)
            .append(sections.menu.items.logout);
        sections.menu.ready = true;
    }

    sectionsHide();
    if (userService.isLoggedIn()) {
        sections.menu.items.login.hide();
        sections.menu.items.signup.hide();
        sections.menu.items.game.show();
        sections.menu.items.about.show();
        sections.menu.items.profile.show();
        sections.menu.items.logout.show();
    } else {
        sections.menu.items.login.show();
        sections.menu.items.signup.show();
        sections.menu.items.about.show();
        sections.menu.items.profile.hide();
        sections.menu.items.game.hide();
        sections.menu.items.logout.hide();
    }
    sections.menu.show();
}

title.on('click', openMenu);
openMenu();

userService.getData()
    .then(function () {
        openMenu();
    })
    .catch(function (/*error*/) {
    });
