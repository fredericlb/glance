var React = require("react/addons");
import {RaisedButton, Paper, IconButton, Avatar} from "material-ui";
import {Navigation, Style} from "../../utils/mixins-decorators.js";
import UserStore from "../../stores/user-store.js";
import * as gravatar from "gravatar";
import UserActions from "../../actions/user-actions.js";
import connectToStores from "alt/utils/connectToStores";
import firebaseService from "../../utils/firebase-service";

@connectToStores
@Navigation
@Style({
    "user-mail": {
      color: "white"
    },
    "avatar": {
      float: "left",
      marginRight: 10,
      position: "relative",
      top: 5
    },
    "user-actions": {
      position: "relative",
      top: -5
    },
    "member-view": {
      float: "right",
      width: 200,
      height: 50,
      overflow: "hidden"
    }}
)
class MemberView extends React.Component {

  static getStores() { return [UserStore]; }
  static getPropsFromStores() { return {user: UserStore.getState()}; }

  constructor(props) {
    super(props);
    this.state = {
      fullDisplay: false
    };
  }

  componentDidMount() {
    setImmediate(() => {
      firebaseService.ref.onAuth((e) => {
        UserActions.firebaseUpdate(e);
      });
    });
  }

  renderConnectButton() {
    return (
      <RaisedButton label="Se connecter" primary={true}
        style={{position: "relative", top: "4px"}}
        onClick={() => this.transitionTo("login")}/>
    );
  }

  renderMember() {
    let {loggedIn, userInfos} = this.props.user;
    var gravatarUrl = gravatar.url(userInfos.email, {
      s: "40",
      r: "pg"
    });

    return (
      <div>
        <Avatar src={gravatarUrl} style={this._("avatar")}/>
        <div style={{marginLeft: 10}}>
          <div style={this._("user-mail")}>{userInfos.email}</div>
          <div style={this._("user-actions")}>
            <IconButton
              iconClassName="mdi mdi-settings"
              iconStyle={{color: "white"}}/>
            <IconButton
              iconClassName="mdi mdi-account-multiple"
              onClick={() => this.transitionTo("users")}
              iconStyle={{color: "white"}}/>
            <IconButton
              iconClassName="mdi mdi-exit-to-app"
              onClick={() => UserActions.logout()}
              iconStyle={{color: "white"}}/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let {loggedIn} = this.props.user;
    let content;
    if (loggedIn) {
      content = this.renderMember();
    }
    else {
      content = this.renderConnectButton();
    }

    return (
      <div style={this._("member-view")}>
        {content}
      </div>
    );
  }

}

export default MemberView;
