var React = require("react/addons");
import {AppBar} from "material-ui";
import UiActions from "../actions/ui-actions";
import MemberView from "./header/member-view-cpn.js";
import ChannelsDropdown from "./header/channels-dropdown-cpn.js";

class Header extends React.Component {
  constructor () {
    super();
    this.state = {};
  }

  render() {
    var iconRight =
      <div className="appbar-right">
        <MemberView/>
        <ChannelsDropdown/>
      </div>;

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
