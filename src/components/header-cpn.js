"use strict";

var React = require("react/addons");
import {AppBar, RaisedButton} from "material-ui";
import UiActions from "../actions/ui-actions";
import {Navigation} from "../utils/mixins-decorators.js";

require("../styles/header.less");



@Navigation
class MemberView extends React.Component {

  render() {
    return (
      <RaisedButton label="Se connecter" primary={true}
        style={{position: "relative", top: "4px"}}
        onClick={() => this.transitionTo("login")}/>
    );
  }

}


class Header extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render() {
    var iconRight = <MemberView/>;

    return (
      <div className="header">
        <AppBar title="Glance"
            onLeftIconButtonTouchTap={UiActions.toggleMainMenu}
            iconElementRight={iconRight}/>
      </div>
    );
  }
}



export default Header;
