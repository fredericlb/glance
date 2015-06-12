"use strict";

var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
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
        <form style={{padding: 10}}>
          <img src={gravatarUrl} style={{float: "right"}}/>
          <h2>{this.props.user.email}</h2>
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

export default UserEditionForm;
