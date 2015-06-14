var React = require("react/addons");
import {DropDownMenu} from "material-ui";
import airflux from "airflux";

var menuItems = [
   { payload: "1", text: "Never" },
   { payload: "2", text: "Every Night" },
   { payload: "3", text: "Weeknights" },
   { payload: "4", text: "Weekends" },
   { payload: "5", text: "Weekly" },
];

var _s = {
  float: "left",
  position: "relative",
  top: 1,
  borderBottom: 0,
  backgroundColor: "#EFEFEF"
};

class ChannelsDropdown extends airflux.FluxComponent {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div style={_s}>
        <DropDownMenu menuItems={menuItems}/>
      </div>
    );
  }

}

export default ChannelsDropdown;
