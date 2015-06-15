var React = require("react/addons");
import connectToStores from "alt/utils/connectToStores";
import usersStore from "../../stores/users-store.js";
import {Style} from "../../utils/mixins-decorators";

@Style({
  "card": {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderLeftStyle: "solid",
    $sub: {
      notSelected: {
        cursor: "pointer",
        borderColor: "#CDCDCD",
        $applyIf: (s, p) => !p.isSelected
      },
      selected: {
        cursor: "auto",
        borderColor: "red",
        $applyIf: (s, p) => p.isSelected
      }
    }
  },
  "arrow": {
    fontSize: 48,
    float: "right",
    position: "relative",
    top: -3,
    color: "#CDCDCD",

    $sub: {
      "selected": {
        color: "red",
        $applyIf: (s, p) => p.isSelected
      }
    }
  }
})
class UserItem extends React.Component {
  render() {
    let u = this.props.user;
    return (
      <div style={this._("card")}
        onClick={() => this.props.onSelect(u)}>
        <i className="mdi mdi-chevron-right"
          style={this._("arrow")}/>
        <h3>{u.email}</h3>
        <div>{u.firstname} {u.lastname}</div>
      </div>
    );
  }
}


@connectToStores
class UsersList extends React.Component {

  constructor (props) {
    super(props, {users: usersStore});
  }

  static getStores() { return [usersStore]; }
  static getPropsFromStores() { return {users: usersStore.getState()}; }

  render() {
    let users = this.props.users.list;
    let {width} = this.props;

    var _users = users.map(u => {
      var isSelected = this.props.selectedUser && this.props.selectedUser.$fbKey === u.$fbKey;
      return <UserItem key={u.$fbKey} user={u} isSelected={isSelected} onSelect={this.props.onSelect}/>;
    });

    return (
      <div style={{margin: "0 20px 0 20px"}}>
        {_users}
      </div>
    );

  }
}

export default UsersList;
