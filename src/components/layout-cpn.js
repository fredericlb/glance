var React = require("react/addons");

import Header from "./header-cpn.js";
import Menu from "./menu-cpn.js";
import {RouteHandler} from "react-router";

// CSS
require("normalize.css");
require("../styles/defaults.less");

import MUI from "material-ui";

var themeManager = MUI.Styles.ThemeManager();


themeManager.setTheme(themeManager.types.LIGHT);


class Layout extends React.Component {

    constructor () {
        super();
        this.state = {};
    }

    getChildContext() {
        return {
            muiTheme: themeManager.getCurrentTheme()
        };
    }

    render() {
        return (
          <div className='main'>
            <Header/>
            <Menu/>
              <RouteHandler/>
          </div>
        );
    }
}

Layout.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Layout;
