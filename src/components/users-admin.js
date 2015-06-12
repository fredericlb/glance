"use strict";

var React = require("react/addons");
import airflux from "airflux";
import {Tabs, Tab, RaisedButton} from "material-ui";
import usersActions from "../actions/users-actions.js";
import UserEditionForm from "./user-admin/user-edition-form-cpn.js";
import UserCreationForm from "./user-admin/user-creation-form-cpn.js";
import UsersList from "./user-admin/users-list-cpn.js";

const _s = {
  "action-pane": {
    padding: 5,
    width: "47%",
    float: "left"
  }
};

class UsersAdmin extends airflux.FluxComponent {

  constructor (props) {
    super(props);
    this.state.currentAction = "new-user";
    this.state.currentUser = {};
    this.state.listWidth = 0;
  }

  renderForAction() {
    if (this.state.currentAction === "new-user") {
      return <UserCreationForm/>;
    } else if (this.state.currentAction === "edit-user") {
      return <UserEditionForm user={this.state.currentUser}/>;
    }
  }

  componentDidMount() {
    let node = React.findDOMNode(this);
    this.setState({
      listWidth: node.getElementsByClassName("list")[0].offsetWidth
    });
    usersActions.startChannel();
  }

  componentWillUnmount(){
    usersActions.stopChannel();
  }

  render() {

    let onUserSelected = (u) => {
      this.setState({
        currentAction: "edit-user",
        currentUser: u
      });
    };

    return (
      <div className="users-admin">
        <div className="list" style={{float: "left", width: "50%"}}>
          <Tabs>
            <Tab label="Groupes">
            </Tab>
            <Tab label="Utilisateurs">
              <UsersList
                width={this.state.listWidth}
                onSelect={onUserSelected}/>
            </Tab>
          </Tabs>
        </div>
        <div style={_s["action-pane"]}>
          <RaisedButton label="Ajouter un utilisateur" primary={true}
            style={{marginRight: 10}}/>
          <RaisedButton label="Ajouter un groupe" primary={true}/>
          <div style={{marginTop: 20}}>
            {this.renderForAction()}
          </div>
        </div>
      </div>
    );
  }
}



export default UsersAdmin;
