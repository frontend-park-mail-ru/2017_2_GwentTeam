'use strict';

import Block from '/blocks/block/index.js';
import Form from '/blocks/form/index.js';
import Scoreboard from '/blocks/scoreboard/index.js';
import Profile from '/blocks/profile/index.js';
import UserService from '/services/user-service.js';
import loginFields from '/configs/login-fields.js';
import signupFields from '/configs/signup-fields.js';

const userService = new UserService();
const app = new Block(document.getElementById('application'));//вставить картинку class="background__img"
//const image = Block.Create('img', {}, ['logo__img main__menu']);
//image.src('/logo.png');
//console.log(image);
//const title = Block.Create('a', {}, ['application-header'], 'Frontend-sample application');
const title =  Block.Create('div', {}, ['app__logo']);
const sections = {

    menu: Block.Create('section', {}, ['main__menu']),
    login: Block.Create('section', {}, ['login-section']),
    //play: Block.Create('section', {}, ['play-section']),
    //about: Block.Create('section', {}, ['about-section']),
    signup: Block.Create('section', {}, ['signup-section']),
    //scores: Block.Create('section', {}, ['scores-section']),
    profile: Block.Create('section', {}, ['profile-section']),
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
    console.log('section =', section);
    app.append(section);
});
sectionsHide();
sections.menu.show();

function onSubmitLoginForm(formdata) {
  return userService
    .login(formdata.email, formdata.password)
    .then(function () {
      return userService.getData(true);
    })
    .then(function () {
      sections.login.loginform.reset();
      openMenu();
    })
    .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));


	}

function openLogin() {
    if (!sections.login.ready) {
        sections.login.loginform = new Form(loginFields);
        sections.login.loginform.onSubmit(onSubmitLoginForm);
        sections.login
            .append(Block.Create('h2', {}, [], 'Войдите'))
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
    .signup(formdata.email, formdata.password)
    .then(function () {
      return userService.getData(true);
    })
    .then(function(){
      sections.signup.signupform.reset();
      openMenu();
    })
    .catch((err) => alert(`Some error ${err.status}: ${err.responseText}`));
}

function openSignup() {
    if (!sections.signup.ready) {
        sections.signup.signupform = new Form(signupFields);
        sections.signup.signupform.onSubmit(onSubmitSingUpForm);
        sections.signup
            .append(Block.Create('h2', {}, [], 'Зарегистрируйтесь'))
            .append(sections.signup.signupform);
        sections.signup.ready = true;
    }
    sectionsHide();
    if (userService.isLoggedIn()) {
        return openMenu();
    }
    sections.signup.show();
}

function openScores() {
    if (!sections.scores.ready) {
        sections.scores.scoreboard = new Scoreboard();
        sections.scores
            .append(Block.Create('h2', {}, [], 'Список лидеров'))
            .append(sections.scores.scoreboard);
        sections.scores.ready = true;
    }
    sectionsHide();
    userService.loadUsersList(function (err, users) {
        if (err) {
            alert(`Some error ${err.status}: ${err.responseText}`);
            return openMenu();
        }

        sections.scores.scoreboard.update(users);
        sections.scores.show();
    }, true);
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
    if (userService.isLoggedIn()) {
        userService.getData(function (err, user) {
            if (err) {
                alert(`Some error ${err.status}: ${err.responseText}`);
                return openMenu();
            }

            sections.profile.profile.update(user);
            sections.profile.show();
        }, true);
        return;
    }
    return openMenu();
}

function openMenu() {
    if (!sections.menu.ready) {
        sections.menu.items = {
            login: Block.Create('button', {'data-section': 'login'}, [], 'Вход'),
            signup: Block.Create('button', {'data-section': 'signup'}, [], 'Регистрация'),
            scores: Block.Create('button', {'data-section': 'scores'}, [], 'Таблица лидеров'),
            profile: Block.Create('button', {'data-section': 'profile'}, [], 'Профиль'),
        };
        sections.menu.on('click', function (event) {
            event.preventDefault();
            const target = event.target;
            const section = target.getAttribute('data-section');
            switch (section) {
                case 'login':
                    openLogin();
                    break;
                case 'signup':
                    openSignup();
                    break;
                case 'scores':
                    openScores();
                    break;
                case 'profile':
                    openProfile();
                    break;
            }
        });
        sections.menu
            .append(sections.menu.items.login)
            .append(sections.menu.items.signup)
            .append(sections.menu.items.scores)
            .append(sections.menu.items.profile);
        sections.menu.ready = true;
    }

    sectionsHide();
    if (userService.isLoggedIn()) {
        sections.menu.items.login.hide();
        sections.menu.items.signup.hide();
        sections.menu.items.scores.show();
        sections.menu.items.profile.show();
    } else {
        sections.menu.items.login.show();
        sections.menu.items.signup.show();
        sections.menu.items.scores.show();
        sections.menu.items.profile.hide();
    }
    sections.menu.show();
}

//title.on('click', openMenu);
openMenu();

userService.getData()
		.then(function () {
			openMenu();
		})
		.catch(function (error) {
			// ignore this error
		});
