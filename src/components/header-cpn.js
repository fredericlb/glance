"use strict";

var React = require("react/addons");
import {AppBar} from "material-ui";
import UiActions from "../actions/ui-actions";
import MemberView from "./header/member-view-cpn.js";

require("../styles/header.less");

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
