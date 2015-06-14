import airflux from "airflux";
import UserActions from "../actions/user-actions";

var firebaseService = require("../utils/firebase-service");

class UserStore extends airflux.Store {
    constructor() {
        super();
        this.listenTo(UserActions.login, this.onLogin);
        this.listenTo(UserActions.logout, this.onLogout);
        this.loggedIn = false;
        this.userInfos = {};
        firebaseService.ref.onAuth(this.onAuth.bind(this));
    }

    onAuth(authInfos) {
      if (authInfos && !this.loggedIn) {
        this.userInfos = {
          email: authInfos.password.email,
          authData: authInfos
        };
        this.loggedIn = true;
        this.publishState();
      } else if (!authInfos && this.loggedIn) {
        this.loggedIn = false;
        this.userInfos = {};
        this.publishState();
      }
    }

    get state() {
        return {
          loggedIn: this.loggedIn,
          userInfos: this.userInfos
        };
    }

    onLogin(mail, password) {
      firebaseService.login({
        email: mail,
        password: password
      })
      .catch(err => console.error(err));
    }

    onLogout() {
      firebaseService.logout();
    }
}

export default new UserStore();
