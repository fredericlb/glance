import airflux from "airflux";
import UsersActions from "../actions/users-actions";

var firebaseService = require("../utils/firebase-service");

class UsersStore extends airflux.Store {
    constructor() {
        super();
        this.listenTo(UsersActions.startChannel, this.onStartChannel);
        this.listenTo(UsersActions.stopChannel, this.onStopChannel);
        this.listenTo(UsersActions.save, this.onSave);
        this.firebaseRef = null;
        this.users = [];

        this.childAddedCallback = (snapshot) => {
          let val = snapshot.val();
          this.users.push({
            firstname: val.firstname,
            lastname: val.lastname,
            email: val.email
          });

          this.publishState();
        };
    }

    get state() {
        return {
          list: this.users,
          listening: this.firebaseRef !== null
        };
    }

    onStartChannel() {
      if (this.firebaseRef === null) {
        this.firebaseRef = firebaseService.getRefFor("users");
        this.firebaseRef.on("child_added", this.childAddedCallback);
      }
    }

    onStopChannel() {
      if (this.firebaseRef !== null) {
        this.firebaseRef.off(this.childAddedCallback);
        this.firebaseRef = null;
        this.publishState();
      }
    }

    onSave(user) {
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
}

export default new UsersStore();
