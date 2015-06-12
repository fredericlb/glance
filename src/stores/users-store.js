import airflux from "airflux";
import UsersActions from "../actions/users-actions";
import {firebaseEvents} from "../utils/mixins-decorators.js";
var firebaseService = require("../utils/firebase-service");

@firebaseEvents(firebaseService, "users", "users")
class UsersStore extends airflux.Store {

    constructor() {
        super();
        this.listenTo(UsersActions.startChannel, this.onStartChannel);
        this.listenTo(UsersActions.stopChannel, this.onStopChannel);
        this.listenTo(UsersActions.save, this.onSave);
        this.listenTo(UsersActions.update, this.onUpdate);
        this.users = [];
    }

    get state() {
        return {
          list: this.users,
          listening: this.firebaseRef !== null
        };
    }

    findInFirebaseCollection(user) {
      return this._users.filter(u => user.$fbKey === u.$fbKey)[0];
    }

    onSave(user) {
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

    onUpdate(user, nextUser) {
      this.ref().child(user.$fbKey).update({
        firstname: nextUser.firstname,
        lastname: nextUser.lastname
      });
    }
}

export default new UsersStore();
