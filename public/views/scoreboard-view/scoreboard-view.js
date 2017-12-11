import './scoreboard.styl';
import BaseView from '../../modules/view.js';
import Info from '../../modules/info.js';
import scoreboardTemplate from './scoreboard.pug';
import UserService from '../../services/user-service.js';
import bus from '../../modules/event-bus.js';
import Http from "../../modules/http";

//let users = {};
//let user = {};
const userService = new UserService();

export default class ScoreboardView extends BaseView {

    start() {
        this.valueofPage = 'notlast';
        this.info = new Info();
        this.limit = 3;
        this.offset = 1;
        this.flag = true;
        userService.getUser(true);
        bus.on('user:fetch', (data) => {
            this.user = data.payload;
            userService.getUsers(this.limit, this.offset);
        });
        bus.on('users:fetch', (data) => {
           this.users = data.payload;
            console.warn('this.users', this.users);
           this.check();
           this.render(this.users, this.user, this.flag, this.currentPage);
        });
    }

    render(users, user, flag, page) {
        console.log('ku');
        this.el.innerHTML = scoreboardTemplate({users, user, flag, page});
        this.logic();
    }

    resume() {
        if (!userService.isLoggedIn())
        {//при загрузке /score в урле срабатывает быстрее
            this.pause();
            console.warn(userService.user);
            this.router.go('/');
            return;
        }
        //this.user = userService.getUser(true);
        //this.check();

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
        this.currentPage = (this.offset + this.limit - 1)/3;
    }

    logic() {
        let buttonUser = document.getElementById('user');
        this.currentPage =  document.getElementById('page');
        let buttonBack = document.getElementById('back');
        let buttonForward = document.getElementById('forward');
        //buttonUser.style.border = '2px solid black';
        this.offset === 1
            ? buttonBack.setAttribute('hidden', 'hidden')
            : buttonBack.removeAttribute('hidden');
        console.log('butt', buttonForward);
        if (buttonUser !== null) {
            buttonUser.addEventListener('click', (event) => {
                if (this.offset === this.user.position || this.offset === this.user.position - (this.user.position % 3)) {
                    return;
                }
                (this.user.position % 3 === 1)
                    ? this.offset = this.user.position
                    : this.offset = this.user.position - (this.user.position % 3);
                userService.getUsers(this.limit, this.offset);
            });
        }

        buttonBack.addEventListener(('click'), (event) => {
            if (this.valueofPage === 'last') {
                this.valueofPage = 'notlast';
                this.offset -= 3*2;
            } else {
                this.offset -= 3;
            }
            (this.offset === 1) ? this.flag = true : false;
            userService.getUsers(this.limit, this.offset);
        });

        buttonForward.addEventListener('click', (event) => {
            this.flag = false;
            this.offset += 3;
            userService.getUsers(this.limit, this.offset)
                .then((err) => {
                    if (err.status === 404) {
                        this.info.turnonInfo('Это последняя страничка!');
                        this.check();
                        //this.render(this.users, this.user, this.flag);
                        buttonForward = document.getElementById('forward');
                        buttonForward.setAttribute('hidden', 'hidden');
                        this.valueofPage = 'last';
                    }
                });
            // us.then((err) => {
            //     console.warn('err', err);
            //     return err;
            // });
                //можно еще раз делать запрос на юзера
        });

    }
}