import alt from "../alt";
import GroupsActions from "../actions/groups-actions";
import {firebaseEvents} from "../utils/mixins-decorators.js";
var firebaseService = require("../utils/firebase-service");

@firebaseEvents(firebaseService, "groups")
class GroupsStore {

    constructor() {
      this.bindListeners({
        onStartChannel: GroupsActions.startChannel,
        onStopChannel: GroupsActions.stopChannel,
        onSave: GroupsActions.save,
        onUpdate: GroupsActions.update
      });

      this.list = [];
    }

    onSave({group}) {
      this.ref().push().set({
        name: group.name,
        users: group.users
      });
    }

    onUpdate(opts) {
      let {group, nextGroup} = opts;
      this.ref().child(group.$fbKey)
        .set(nextGroup);
    }
}

export default alt.createStore(GroupsStore);
