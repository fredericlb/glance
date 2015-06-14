var React = require("react/addons");
import airflux from "airflux";
import usersStore from "../../stores/users-store.js";
import lo from "lodash";

const _s = {
  "base": {
    margin: "0 20px 0 20px"
  },
  "user-card": {
    margin: 10,
    cursor: "pointer",
    backgroundColor: "white",
    padding: 10,
    border: "1px solid #CDCDCD",
    borderLeft: "5px solid #CDCDCD",

    rules: {
      selected: {
        cursor: "auto",
        border: "1px solid red",
        borderLeft: "5px solid red"
      }
    }
  },
  "arrow": {
    fontSize: 48,
    float: "right",
    position: "relative",
    top: -3,
    color: "#CDCDCD",

    rules: {
      "selected": {
        color: "red"
      }
    }
  }
};

const S = (cls, rule) => {
  return lo.merge({}, _s[cls], _s[cls].rules[rule]);
};


class UsersList extends airflux.FluxComponent {

  constructor (props) {
    super(props, {users: usersStore});
  }

  render() {
    let users = this.state.users.list;
    let {width} = this.props;

    var _users = users.map(u => {
      var isSelected = this.props.selectedUser && this.props.selectedUser.$fbKey === u.$fbKey;

      var arrowStyle = isSelected ? S("arrow", "selected") : _s.arrow;
      var cardStyle = isSelected ? S("user-card", "selected") : _s["user-card"];
      return (
        <div style={cardStyle} key={u.email}
          onClick={() => this.props.onSelect(u)}>
          <i className="mdi mdi-chevron-right"
            style={arrowStyle}/>
          <h3>{u.email}</h3>
          <div>{u.firstname} {u.lastname}</div>
        </div>
      );
    });

    return (
      <div style={_s.base}>
        {_users}
      </div>
    );

  }
}

export default UsersList;
