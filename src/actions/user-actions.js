import alt from "../alt";

class UserActions {
  login(mail, password) { this.dispatch({mail, password}); }
  logout() { this.dispatch(); }
  firebaseUpdate(authInfos) { this.dispatch({authInfos}); }
}

let Actions = alt.createActions(UserActions);

export default Actions;
