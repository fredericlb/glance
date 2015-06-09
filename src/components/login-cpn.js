"use strict";

var React = require("react/addons");
import airflux from "airflux";
import {Paper, TextField, RaisedButton} from "material-ui";
import UserActions from "../actions/user-actions";
import UserStore from "../stores/user-store";

require("../styles/login.less");

class Login extends airflux.FluxComponent {
    constructor(props) {
        super(props, {user: UserStore});
    }

    renderAlreadyLoggedInMessage() {
      let submitForm = (e) => {
        e.preventDefault();
        UserActions.logout();
      };

      return (
        <div>
          <span>Vous êtes connecté en tant que </span>
          <b>{this.state.user.userInfos.email}</b>
          <div className="button-bar">
              <RaisedButton label="Déconnexion" primary={true}
                onClick={submitForm}/>
          </div>
        </div>
      );
    }

    renderLoginForm() {
      let submitForm = (e) => {
        e.preventDefault();
        var mail = this.refs.mail.getValue();
        var password = this.refs.password.getDOMNode().value;
        UserActions.login(mail, password);
      };

      return (
        <form>
            <div className="fields">
                <TextField ref="mail"
                  hintText="E-mail" style={{width: "95%"}}/>
                <input ref="password"
                  type="password" placeholder="Mot de passe"/>
            </div>
            <div className="button-bar">
                <RaisedButton label="Se connecter" primary={true}
                  onClick={submitForm}/>
            </div>
        </form>
      );
    }

    render() {
        let content;

        if (this.state.user.loggedIn) {
          content = this.renderAlreadyLoggedInMessage();
        } else {
          content = this.renderLoginForm();
        }

        return (
            <div className="Login">
                <Paper zDepth={2}>
                  <div className="spacer">
                    {content}
                    <div style={{clear: "both"}}></div>
                  </div>
                </Paper>
            </div>
        );
    }
}



export default Login;
