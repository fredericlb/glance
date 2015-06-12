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
        this.users = [];
    }

    get state() {
        return {
          list: this.users,
          listening: this.firebaseRef !== null
        };
    }

    _createUser(user) {
      firebaseService.createUser(user.email, user.password)
        .then(() => {
          this.firebaseRef.child(user.email.replace(".", "!")).set({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }


    onSave(user) {
      var isUpdate = user.$fbKey !== null;

      if (isUpdate) {
        // TODO
      } else {
        this._createUser();
      }

    }
}

export default new UsersStore();
