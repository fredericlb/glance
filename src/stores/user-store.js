import alt from "../alt";
import UserActions from "../actions/user-actions";
var firebaseService = require("../utils/firebase-service");

class UserStore {
    constructor() {
      this.bindActions(UserActions);
      this.loggedIn = false;
      this.userInfos = {};
    }

    onFirebaseUpdate({authInfos}) {
      if (authInfos && !this.loggedIn) {
        this.userInfos = {
          email: authInfos.password.email
        };
        this.loggedIn = true;
      } else if (!authInfos && this.loggedIn) {
        this.loggedIn = false;
        this.useerInfos = {};
      }
    }

    onLogin(opts) {
      let {mail, password} = opts;
      firebaseService.login({
        email: mail,
        password: password
      })
      .catch(err => console.error(err));
    }

    onLogout() {
      setImmediate(() => {
        firebaseService.logout();
      });
    }
}

export default alt.createStore(UserStore);
