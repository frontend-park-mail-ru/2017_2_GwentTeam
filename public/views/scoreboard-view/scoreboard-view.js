import './scoreboard.styl';
import BaseView from '../../modules/view.js';
import scoreboardTemplate from './scoreboard.pug';
import UserService from '../../services/user-service.js';
import bus from '../../modules/event-bus.js';
import Http from "../../modules/http";

const url = 'https://technogwent-api-011.herokuapp.com/api';
const limit = 10;

//let users = {};
//let user = {};
const userService = new UserService();

export default class ScoreboardView extends BaseView {

    start() {
        this.flag = true;
        this.users = [{
            login: 'a1',
            email: 'a@mail.ru',
            password: 1234,
            scores: 12
        }, {
            login: 'a2',
            email: 'a2@mail.ru',
            password: 1234,
            scores: 10
        }, {
            login: 'a3',
            email: 'a3@mail.ru',
            password: 1234,
            scores: 11
        }];
        this.user = {
            login: 'a4',
            email: 'a@mail.ru',
            password: 1234,
            scores: 12
        };
        //bus.on('users:fetch')
        //bus.on('user:authorized')
    }

    render(users, user, flag) {
        console.log('ku')
        this.el.innerHTML = scoreboardTemplate({users, user, flag});
        this.logic();
    }

    resume() {
        // if (Http.Get(url + '/auth').catch((res) => {
        //     return res.statusCode;
        // }) === 401)
        if (!userService.isLoggedIn())
        {//при загрузке /score в урле срабатывает быстрее
            this.pause();
            console.warn(userService.user);
            this.router.go('/');
            return;
        }
        this.check();
        //this.users = userService.getUsers(limit, 1);
        //this.user = userService.getUser();
        this.render(this.users, this.user, this.flag);
        //const us = userService.getUsers();
        console.log('2');
        super.resume();
    }

    check() {
        Object.values(this.users).forEach((element, elementIndex)=> {
            if (element.login === this.user.login) {
                this.flag = false;
                this.users.splice(elementIndex, 1, this.user);
                console.log('flag, users', this.flag, this.users);
            }
        });
    }

    logic() {
        let buttonUser = document.getElementById('user');
        console.log('butt', buttonUser);
        buttonUser.addEventListener('click', (event) => {
            //this.users = userService.getUsers(limit, this.user.place)
       });
        let buttonBack = document.getElementById('back');
        let buttonForward = document.getElementById('forward');
    }
}