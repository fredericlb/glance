import airflux from "airflux";
import GroupsActions from "../actions/groups-actions";
import {firebaseEvents} from "../utils/mixins-decorators.js";
var firebaseService = require("../utils/firebase-service");

@firebaseEvents(firebaseService, "groups", "groups")
class GroupsStore extends airflux.Store {

    constructor() {
        super();
        this.listenTo(GroupsActions.startChannel, this.onStartChannel);
        this.listenTo(GroupsActions.stopChannel, this.onStopChannel);
        this.listenTo(GroupsActions.save, this.onSave);
        this.listenTo(GroupsActions.update, this.onUpdate);
        this.groups = [];
    }

    get state() {
        return {
          list: this.groups,
          listening: this.firebaseRef !== null
        };
    }

    onSave(group) {
      this.ref().push().set({
        name: group.name,
        users: {}
      });
    }

    onUpdate(group, nextGroup) {
      this.ref().child(group.$fbKey).child("name").set(nextGroup.name);
    }
}

export default new GroupsStore();
