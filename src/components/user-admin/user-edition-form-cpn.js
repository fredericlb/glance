"use strict";

var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
import * as gravatar from "gravatar";
import usersActions from "../../actions/users-actions.js";

require("../../styles/users-admin.less");

class UserCreationForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      firstname: null,
      lastname: null,

    };
  }

  onSubmit() {
    let {email, password, firstname, lastname, $fbKey} = this.state;

    let user = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      $fbKey: $fbKey
    };

    if (email !== "" && password !== "" && firstname !== "" && lastname !== "") {
      usersActions.save(user);
      this.reset();
    }

  }

  reset() {
    this.setState({
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      $fbKey: null
    });
  }

  updateUserFromProps(user) {
    if (!user) {
      this.reset();
    }

    this.setState({
      email: user.email,
      password: null,
      firstname: user.firstname,
      lastname: user.lastname,
      $fbKey: user.$fbKey
    });
  }

  componentWillMount() {
    this.updateUserFromProps(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    this.updateUserFromProps(nextProps.user);
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

    let title = this.state.$fbKey ?
      "Modifier l'utilisateur" : "Nouvel utilisateur";

    return (
      <Paper zDepth={1}>
        <form className="add-user-form">
          <img src={gravatarUrl} className="user-icon"/>
          <h2>{title}</h2>
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

export default UserCreationForm;
