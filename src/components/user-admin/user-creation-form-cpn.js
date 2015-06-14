var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
import * as gravatar from "gravatar";
import usersActions from "../../actions/users-actions.js";

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
    let {email, password, firstname, lastname} = this.state;

    let user = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname
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
      lastname: null
    });
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

    let title = "Nouvel utilisateur";

    return (
      <Paper zDepth={1}>
        <form style={{padding: 10}}>
          <img src={gravatarUrl} style={{float: "right"}}/>
          <h2>{title}</h2>
          <TextField floatingLabelText="E-mail *"
            onChange={onFieldUpdate("email")} ref="email"
            value={this.state.email}
            errorText={getMessageFor("email")}
            style={{maxWidth: "100%"}}/>
          <TextField floatingLabelText="Mot de passe *"
            onChange={onFieldUpdate("password")} ref="password"
            value={this.state.password}
            errorText={getMessageFor("password")}
            style={{width: "100%"}}/>
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
              onClick={onSubmit} style={{width: "100%"}}/>
          <div className="clearer"/>
        </form>
      </Paper>
    );
  }
}

export default UserCreationForm;
