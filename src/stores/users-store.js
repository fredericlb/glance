import alt from "../alt";
import UsersActions from "../actions/users-actions";
import {firebaseEvents} from "../utils/mixins-decorators.js";
var firebaseService = require("../utils/firebase-service");

@firebaseEvents(firebaseService, "users")
class UsersStore {

    constructor() {
      this.bindListeners({
        onStartChannel: UsersActions.startChannel,
        onStopChannel: UsersActions.stopChannel,
        onSave: UsersActions.save,
        onUpdate: UsersActions.update
      });

      this.list = [];
    }

    onSave({user}) {
      firebaseService.createUser(user.email, user.password)
        .then(() => {
          this.ref().child(user.email.replace(".", "!")).set({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    onUpdate(opts) {
      let {user, nextUser} = opts;
      this.ref().child(user.$fbKey).update({
        firstname: nextUser.firstname,
        lastname: nextUser.lastname
      });
    }
}

export default alt.createStore(UsersStore);
