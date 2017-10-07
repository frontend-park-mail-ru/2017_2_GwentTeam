'use strict';

import Block from '../block/index';
import ProfileTemplate from './profile.pug';
import './index.css';

class Profile extends Block {

    constructor() {
        super('div');
    }

    /**
     *
     * @param {UserService} user
     */
    update(user) {
        this.clear();
        this.el.innerHTML = ProfileTemplate({user});
    }
}
export default Profile;
