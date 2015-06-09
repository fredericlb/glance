"use strict";

var React = require("react/addons");
import {LeftNav, MenuItem} from "material-ui";
import airflux from "airflux";
import mainMenuStore from "../stores/main-menu-store";

var menuItems = [
    {
        route: "overview",
        text: "Plan de travail"
    },
    {
        type: MenuItem.Types.SUBHEADER,
        text: "Canaux"
    },
    {
        route: "lostinusa",
        text: "Lost In USA"
    },
    {
        route: "mindr",
        text: "Mindr"
    },
    {
        type: MenuItem.Types.SUBHEADER,
        text: "Compte"
    },
    {
        route: "login",
        text: "Se connecter"
    }
];

class Menu extends airflux.FluxComponent {
    constructor (props) {
        super(props, {
            toggleMenu: mainMenuStore
        });
        this.state = {};
    }

    toggleMenu() {
        this.refs.leftNav.toggle();
    }

    render() {
        return (
            <LeftNav menuItems={menuItems} ref="leftNav" docked={false}/>
        );
    }
}



export default Menu;
