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

    findInFirebaseCollection(user) {
      return this._users.filter(u => user.$fbKey === u.$fbKey)[0];
    }

    _updateUser(user) {
      var orig = this.findInFirebaseCollection(user);
      let updatePassword = async () => {
        // TODO We need the previous password :(
      };
      let updateEmail = async () => {
        // TODO We need the previous password :(
      };
      let updateData = async () => {
        // TODO
      };
    }

    onSave(user) {
      var isUpdate = user.$fbKey !== null;

      if (isUpdate) {
        this._updateUser();
      } else {
        this._createUser();
      }

    }
}

export default new UsersStore();
