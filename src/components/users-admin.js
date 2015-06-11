"use strict";

var React = require("react/addons");
import airflux from "airflux";
import {Tabs, Tab, Paper, TextField, RaisedButton} from "material-ui";
import * as gravatar from "gravatar";
import usersActions from "../actions/users-actions.js";
import usersStore from "../stores/users-store.js";
import {Table, Column} from "fixed-data-table";

require("../styles/users-admin.less");

class UserCreationForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      firstname: null,
      lastname: null
    };
  }

  onSubmit() {
    let email = this.state.email;
    let password = this.state.password;
    let firstname = this.state.firstname;
    let lastname = this.state.lastname;

    let user = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
    };

    if (email !== "" && password !== "" && firstname !== "" && lastname !== "") {
      usersActions.save(user);
      this.setState({
        email: null,
        password: null,
        firstname: null,
        lastname: null
      });
    }

  }


  render() {
    var gravatarUrl = gravatar.url(this.state.email, {
      s: "80",
      r: "pg"
    });

    let getMessageFor = (key) => {
      if (this.state[key] === "") {
        return "Ce champ est obligatoire";
      } else {
        return null;
      }
    };

    let onSubmit = (e) => {
      e.preventDefault();
      this.onSubmit();
    };

    let onFieldUpdate = (key) => {
      return (e) => {
        var updatedState = {};
        updatedState[key] = e.target.value;
        this.setState(updatedState);
      };
    };

    return (
      <Paper zDepth={1}>
        <form className="add-user-form">
          <img src={gravatarUrl} className="user-icon"/>
          <h2>Nouvel utilisateur</h2>
          <TextField floatingLabelText="E-mail *"
            onChange={onFieldUpdate("email")} ref="email"
            value={this.state.email}
            errorText={getMessageFor("email")}/>
          <TextField floatingLabelText="Mot de passe *"
            onChange={onFieldUpdate("password")} ref="password"
            value={this.state.password}
            errorText={getMessageFor("password")}/>
          <TextField floatingLabelText="Prénom *"
            onChange={onFieldUpdate("firstname")} ref="firstname"
            value={this.state.firstname}
            errorText={getMessageFor("firstname")}/>
          <TextField floatingLabelText="Nom *"
            onChange={onFieldUpdate("lastname")} ref="lastname"
            value={this.state.lastname}
            errorText={getMessageFor("lastname")}/>
          <div className="clearer"/>
          <div className="button-bar">
            <RaisedButton label="Envoyer" primary={true}
              onClick={onSubmit}/>
          </div>
          <div className="clearer"/>
        </form>
      </Paper>
    );
  }
}

class UsersList extends airflux.FluxComponent {

  constructor (props) {
    super(props, {users: usersStore});
  }

  render() {
    let users = this.state.users.list;
    let {width} = this.props;

    return (
      <Table
        rowHeight={30}
        rowGetter={(idx) => users[idx]}
        rowsCount={users.length}
        width={width}
        maxHeight={1000}
        headerHeight={40}>
        <Column
          label="Mail"
          width={width / 2}
          dataKey="email"/>
        <Column
          label="Nom"
          width={width / 4}
          dataKey="lastname"/>
        <Column
          label="Prénom"
          width={width / 4}
          dataKey="firstname"/>
      </Table>
    );

  }
}


class UsersAdmin extends airflux.FluxComponent {

  constructor (props) {
    super(props);
    this.state.currentAction = "new-user";
    this.state.listWidth = 0;
  }

  renderForAction() {
    if (this.state.currentAction === "new-user") {
      return <UserCreationForm/>;
    } else {
      return "";
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
    return (
      <div className="users-admin">
        <div className="list" style={{float: "left", width: "50%"}}>
          <Tabs>
            <Tab label="Groupes">
            </Tab>
            <Tab label="Utilisateurs">
              <UsersList
                width={this.state.listWidth}/>
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
