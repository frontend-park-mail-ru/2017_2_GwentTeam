import './scoreboard.styl';
import BaseView from '../../modules/view.js';
import Info from '../../modules/info.js';
import scoreboardTemplate from './scoreboard.pug';
import UserService from '../../services/user-service.js';
import bus from '../../modules/event-bus.js';

const userService = new UserService();

const DEFAULT_OFFSET = 1;
const DEFAULT_LIMIT = 3;

export default class ScoreboardView extends BaseView {

    start() {
        this.valueofPage = 'notlast';
        this.info = new Info();
        this.limit = DEFAULT_LIMIT;
        this.offset = DEFAULT_OFFSET;
        this.flag = true;
        bus.on('user:notauthorized', () => {//добавить сюда go
            console.warn('what');
            this.resume();
        });
        userService.getUser(true);//второй ненужный запрос

        bus.on('user:fetch', (data) => {
            this.user = data.payload;
            userService.getUsers(this.limit, this.offset);
        });
        bus.on('users:fetch', (data) => {
            this.users = data.payload;
            this.check();
            this.resume();
            this.render(this.users, this.user, this.flag, this.currentPage);
        });
    }

    render(users, user, flag, page) {
        this.el.innerHTML = scoreboardTemplate({
            users,
            user,
            flag,
            page
        });
        this.logic();
    }

    resume() {
        if (userService.user === null) {
            this.pause();
            this.router.go('/');
            return;
        }
        super.resume();
    }

    check() {
        Object.values(this.users).forEach((element, elementIndex) => {
            if (element.login === this.user.login) {
                this.flag = false;
                this.users.splice(elementIndex, 1, this.user);
            }
        });
        this.currentPage = (this.offset + this.limit - DEFAULT_OFFSET) / DEFAULT_LIMIT;
    }

    logic() {
        let buttonUser = document.getElementById('user');
        this.currentPage = document.getElementById('page');
        let buttonBack = document.getElementById('back');
        let buttonForward = document.getElementById('forward');
        this.offset === DEFAULT_OFFSET ?
            buttonBack.setAttribute('hidden', 'hidden') :
            buttonBack.removeAttribute('hidden');
        if (buttonUser !== null) {
            buttonUser.addEventListener('click', () => {
                if (this.offset === this.user.position || this.offset === this.user.position - (this.user.position % 3)) {
                    return;
                }
                (this.user.position % DEFAULT_LIMIT === DEFAULT_OFFSET) ?
                    this.offset = this.user.position: this.offset = this.user.position - (this.user.position % DEFAULT_LIMIT);
                userService.getUsers(this.limit, this.offset);
            });
        }

        buttonBack.addEventListener(('click'), () => {
            if (this.valueofPage === 'last') {
                this.valueofPage = 'notlast';
                this.offset -= DEFAULT_LIMIT * 2;
            } else {
                this.offset -= DEFAULT_LIMIT;
            }
            (this.offset === DEFAULT_OFFSET) ? this.flag = true: false;
            userService.getUsers(this.limit, this.offset);
        });

        buttonForward.addEventListener('click', () => {
            this.flag = false;
            this.offset += DEFAULT_LIMIT;
            userService.getUsers(this.limit, this.offset)
                .then((err) => {
                    if (err.status === 404) {
                        this.info.turnonInfo('Это последняя страничка!');
                        this.check();
                        buttonForward = document.getElementById('forward');
                        buttonForward.setAttribute('hidden', 'hidden');
                        this.valueofPage = 'last';
                    }
                });
        });

    }
}
