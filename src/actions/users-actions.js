import alt from "../alt";

class UsersActions {
  startChannel() { this.dispatch({}); }
  stopChannel() { this.dispatch({}); }
  save(user) { this.dispatch({ user }); }
  update(user, nextUser) { this.dispatch({user, nextUser}); }
}

let Actions = alt.createActions(UsersActions);

export default Actions;
