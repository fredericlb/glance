"use strict";

var React = require("react/addons");
import {Tabs, Tab, RaisedButton} from "material-ui";
import usersActions from "../actions/users-actions.js";
import groupsActions from "../actions/groups-actions.js";
import UserEditionForm from "./user-admin/user-edition-form-cpn.js";
import UserCreationForm from "./user-admin/user-creation-form-cpn.js";
import UsersList from "./user-admin/users-list-cpn.js";
import GroupsList from "./user-admin/group-list-cpn";
import GroupEditionForm from "./user-admin/group-edition-form-cpn";
import GroupCreationForm from "./user-admin/group-creation-form-cpn";
import {Style} from "../utils/mixins-decorators";

@Style({
  "action-pane": {
    padding: 5,
    width: "47%",
    float: "left"
  }
})
class UsersAdmin extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      currentAction: "new-user",
      currentUser: {},
      currentGroup: {},
      listWidth: 0
    };
  }

  renderForAction() {
    if (this.state.currentAction === "new-user") {
      return <UserCreationForm/>;
    } else if (this.state.currentAction === "edit-user") {
      return <UserEditionForm user={this.state.currentUser}/>;
    } else if (this.state.currentAction === "edit-group") {
      return <GroupEditionForm group={this.state.currentGroup}/>;
    } else if (this.state.currentAction === "new-group") {
      return <GroupCreationForm/>;
    } else {
      return <div/>;
    }
  }

  componentDidMount() {
    let node = React.findDOMNode(this);
    this.setState({
      listWidth: node.getElementsByClassName("list")[0].offsetWidth
    });
    usersActions.startChannel();
    groupsActions.startChannel();
  }

  componentWillUnmount(){
    usersActions.stopChannel();
    groupsActions.startChannel();
  }

  render() {

    let onUserSelected = (u) => {
      this.setState({
        currentAction: "edit-user",
        currentUser: u
      });
    };
    let onGroupSelected = (g) => {
      this.setState({
        currentAction: "edit-group",
        currentGroup: g
      });
    };

    return (
      <div className="users-admin">
        <div className="list" style={{float: "left", width: "50%"}}>
          <Tabs>
            <Tab label="Groupes">
              <GroupsList
                onSelect={onGroupSelected}
                selectedGroup={this.state.currentGroup}/>
            </Tab>
            <Tab label="Utilisateurs">
              <UsersList
                width={this.state.listWidth}
                onSelect={onUserSelected}
                selectedUser={this.state.currentUser}/>
            </Tab>
          </Tabs>
        </div>
        <div style={this._("action-pane")}>
          <RaisedButton label="Ajouter un utilisateur" secondary={true}
            style={{marginRight: 10}}
            onClick={() => this.setState({currentAction: "new-user", currentUser: null})}/>
          <RaisedButton label="Ajouter un groupe" secondary={true}
            onClick={() => this.setState({currentAction: "new-group", currentGroup: null})}/>
          <div style={{marginTop: 20}}>
            {this.renderForAction()}
          </div>
        </div>
      </div>
    );
  }
}



export default UsersAdmin;
