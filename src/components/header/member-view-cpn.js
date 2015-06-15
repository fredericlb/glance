var React = require("react/addons");
import {RaisedButton, Paper, IconButton} from "material-ui";
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
      marginLeft: 10,
      lineHeight: "40px",
      marginRight: 5
    },
    "avatar": {
      borderRadius: 3,
      float: "left"
    },
    "user-actions": {
      float: "right"
    },
    "user-badge": {
      height: 42,
      overflow: "hidden",
      border: "1px solid #dedede",
      borderRadius: 3,
      transition: "height ease-out 100ms, border-color ease-out 200ms",
      $sub: {
        "with-actions": {
          height: 84,
          borderColor: "#999",
          $applyIf: (s) => s.fullDisplay
        }
      }
    },
    "member-view": {
      float: "right"
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
      <div style={this._("user-badge")}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        <Paper zDepth={1} style={{padding: 1, position: "relative"}}>
          <img src={gravatarUrl} style={this._("avatar")}/>
          <span style={this._("user-mail")}>{userInfos.email}</span>
          <div style={{clear: "both"}}/>
          <div style={this._("user-actions")}>
            <IconButton
              iconClassName="mdi mdi-settings"/>
            <IconButton
              iconClassName="mdi mdi-account-multiple"
              onClick={() => this.transitionTo("users")}/>
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
