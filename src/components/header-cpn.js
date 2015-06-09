"use strict";

var React = require("react/addons");
import {AppBar} from "material-ui";
import UiActions from "../actions/ui-actions";

class Header extends React.Component {
    constructor () {
        super();
        this.state = {};
    }

    render() {
        return (
          <AppBar title="Glance"
              onLeftIconButtonTouchTap={UiActions.toggleMainMenu}/>
        );
    }
}



export default Header;
