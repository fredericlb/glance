var React = require("react/addons");
import {RaisedButton, Paper, IconButton} from "material-ui";
import {Navigation} from "../../utils/mixins-decorators.js";
import airflux from "airflux";
import UserStore from "../../stores/user-store.js";
import * as gravatar from "gravatar";
import UserActions from "../../actions/user-actions.js";

require("../../styles/header/member-view.less");

@Navigation
class MemberView extends airflux.FluxComponent {

  constructor(props) {
      super(props, {user: UserStore});
      this.state.fullDisplay = false;
  }

  renderConnectButton() {
    return (
      <RaisedButton label="Se connecter" primary={true}
        style={{position: "relative", top: "4px"}}
        onClick={() => this.transitionTo("login")}/>
    );
  }

  renderMember() {
    let {loggedIn, userInfos} = this.state.user;
    var gravatarUrl = gravatar.url(userInfos.email, {
      s: "40",
      r: "pg",
      d: "404"
    });

    var onMouseOver = () => this.setState({fullDisplay: true});
    var onMouseOut = () => this.setState({fullDisplay: false});
    var classes = ["user-badge"];

    if (this.state.fullDisplay) {
      classes.push("with-actions");
    }

    return (

      <div className={classes.join(" ")}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        <Paper zDepth={1} style={{padding: 1, position: "relative"}}>
          <img src={gravatarUrl}/>
          <span className="user-mail">{userInfos.email}</span>
          <div style={{clear: "both"}}/>
          <div className="user-actions">
            <IconButton
              iconClassName="mdi mdi-settings"/>
            <IconButton
              iconClassName="mdi mdi-account-multiple"/>
            <IconButton
              iconClassName="mdi mdi-exit-to-app"
              onClick={() => UserActions.logout()}/>
          </div>
          <div style={{clear: "both"}}/>
        </Paper>
      </div>
    );
  }

  render() {
    let {loggedIn} = this.state.user;
    let content;
    if (loggedIn) {
      content = this.renderMember();
    }
    else {
      content = this.renderConnectButton();
    }

    return (
      <div className="member-view">
        {content}
      </div>
    );
  }

}

export default MemberView;
