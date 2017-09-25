//(function () {
'use strict';
import Block from '../block/index.js'
//import {profileTemplate} from './profile.pug.js'
//const Block = window.Block;
//const ProfileTemplate = profileTemplate;

class Profile extends Block {
    constructor() {
        const el = document.createElement('div');
        super(el);

    }

    update(user) {//почему тут нет bind?
        this.clear();

        this.el.innerHTML = function (){
            user.forEach(function (us) {
                us.append(us);
            });
            // ({user});
        }
    }
}
export default Profile;
//window.Profile = Profile;

//})();
