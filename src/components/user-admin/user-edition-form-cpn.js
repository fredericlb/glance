"use strict";

var React = require("react/addons");
import {Paper, TextField, RaisedButton, Avatar} from "material-ui";
import * as gravatar from "gravatar";
import usersActions from "../../actions/users-actions.js";

class UserEditionForm extends React.Component {

  constructor() {
    super();
    this.state = {
      firstname: null,
      lastname: null
    };
  }

  onSubmit() {
    let {firstname, lastname} = this.state;

    let user = {
      firstname: firstname,
      lastname: lastname
    };

    if (firstname !== "" && lastname !== "") {
      usersActions.update(this.props.user, user);
      this.reset();
    }

  }

  reset() {
    this.setState({
      firstname: null,
      lastname: null
    });
  }

  updateUserFromProps(user) {
    if (!user) {
      this.reset();
      return;
    }

    this.setState({
      firstname: user.firstname,
      lastname: user.lastname
    });
  }

  componentWillMount() {
    this.updateUserFromProps(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    this.updateUserFromProps(nextProps.user);
  }

  render() {
    var gravatarUrl = gravatar.url(this.props.user.email, {
      s: "160",
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
        <form style={{padding: 10}}>
          <h2 style={{float: "right"}}>{this.props.user.email}</h2>
          <Avatar src={gravatarUrl}/>
          <TextField floatingLabelText="Prénom *"
            onChange={onFieldUpdate("firstname")} ref="firstname"
            value={this.state.firstname}
            errorText={getMessageFor("firstname")}
            style={{width: "100%"}}/>
          <TextField floatingLabelText="Nom *"
            onChange={onFieldUpdate("lastname")} ref="lastname"
            value={this.state.lastname}
            errorText={getMessageFor("lastname")}
            style={{width: "100%"}}/>
          <div className="clearer"/>
          <RaisedButton label="Envoyer" primary={true}
            onClick={onSubmit}
            style={{width: "100%"}}/>
          <div className="clearer"/>
        </form>
      </Paper>
    );
  }
}

export default UserEditionForm;
