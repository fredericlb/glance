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
      }).then(authData => {
        this.loggedIn = true;
        this.userInfos = {
          email: mail,
          authData: authData
        };
        this.publishState();
      })
      .catch(err => console.error(err));
    }

    onLogout() {
      firebaseService.logout();
      this.loggedIn = false;
      this.userInfos = {};
      this.publishState();
    }
}

export default new UserStore();
