"use strict";

var React = require("react/addons");
import airflux from "airflux";
import {Tabs, Tab} from "material-ui";
import usersActions from "../actions/users-actions.js";
import UserEditionForm from "./user-admin/user-edition-form-cpn.js";
import UsersList from "./user-admin/users-list-cpn.js";

require("../styles/users-admin.less");

class UsersAdmin extends airflux.FluxComponent {

  constructor (props) {
    super(props);
    this.state.currentAction = "new-user";
    this.state.currentUser = {};
    this.state.listWidth = 0;
  }

  renderForAction() {
    if (this.state.currentAction === "new-user") {
      return <UserEditionForm/>;
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
        <div className="action-pane">
          {this.renderForAction()}
        </div>
      </div>
    );
  }
}



export default UsersAdmin;
