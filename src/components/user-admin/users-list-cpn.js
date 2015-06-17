var React = require("react/addons");
import connectToStores from "alt/utils/connectToStores";
import usersStore from "../../stores/users-store.js";
import {List, ListItem, Avatar} from "material-ui";
import * as gravatar from "gravatar";

class UserItem extends React.Component {
  render() {
    let u = this.props.user;

    var gravatarUrl = gravatar.url(u.email, {
      s: "80",
      r: "pg"
    });

    return (
      <ListItem
        leftAvatar={<Avatar src={gravatarUrl} />}
        secondaryText={`${u.firstname} ${u.lastname}`}
        onTouchTap={() => this.props.onSelect(u)}>
        {u.email}
      </ListItem>
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
      <List subheader="Utilisateurs">
        {_users}
      </List>
    );

  }
}

export default UsersList;
