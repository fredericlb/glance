var React = require("react/addons");
import airflux from "airflux";
import {Paper} from "material-ui";
import usersStore from "../../stores/users-store.js";

const _s = {
  "base": {
    margin: "0 20px 0 20px"
  },
  "user-card": {
    margin: 10,
    cursor: "pointer"
  }
};

class UsersList extends airflux.FluxComponent {

  constructor (props) {
    super(props, {users: usersStore});
  }

  render() {
    let users = this.state.users.list;
    let {width} = this.props;

    var _users = users.map(u => {
      return (
        <Paper zDepth={1} rounded={false} key={u.$fbKey}
          onClick={() => this.props.onSelect(u)}>
          <div style={_s["user-card"]}>
            <h3>{u.email}</h3>
            <div>{u.firstname} {u.lastname}</div>
          </div>
        </Paper>
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
