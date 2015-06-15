import alt from "../alt";

class GroupsActions {
  startChannel() { this.dispatch({}); }
  stopChannel() { this.dispatch({}); }
  save(group) { this.dispatch({ group }); }
  update(group, nextGroup) { this.dispatch({group, nextGroup}); }
}

export default alt.createActions(GroupsActions);
