var React = require("react");
import Layout from "./layout-cpn.js";
import Router from "react-router";
import AddItem from "./add-item-cpn.js";
import Login from "./login-cpn.js";

var {Route, DefaultRoute} = Router;

require("react-tap-event-plugin")();

var content = document.getElementById("content");

var Routes = (
    <Route name="/" handler={Layout}>
        <DefaultRoute handler={AddItem}/>
        <Route name="login" handler={Login}/>
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});
