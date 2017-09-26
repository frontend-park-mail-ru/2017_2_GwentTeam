'use strict';

import Block from '../block/index.js';

const ProfileTemplate = profileTemplate;
class Profile extends Block {
    constructor() {
        const el = document.createElement('div');
        super(el);

    }

    update(user) {//почему тут нет bind?
        this.clear();

        this.el.innerHTML = ProfileTemplate({user});
    }
}
export default Profile;

