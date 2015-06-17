var React = require("react/addons");
import {Tokenizer} from "react-typeahead";
import connectToStores from "alt/utils/connectToStores";
import usersStore from "../../stores/users-store.js";

@connectToStores
class UserCompletion extends React.Component {
  static getStores() { return [usersStore]; }
  static getPropsFromStores() { return {users: usersStore.getState()}; }

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    defaults: React.PropTypes.array
  };

  render() {
    let userNames = this.props.users.list.map(
        u => `${u.firstname} ${u.lastname} <${u.email}>`
    );

    let onTokenChange = this.props.onChange;
    let defaults = this.props.defaults || [];
    let existingTokens = defaults.map(t => {
      let user = this.props.users.list.filter(
        u => u.$fbKey === t
      )[0];
      return `${user.firstname} ${user.lastname} <${user.email}>`;
    });

    return (
      <Tokenizer
        options={userNames}
        onTokenAdd={onTokenChange}
        onTokenRemove={onTokenChange}
        defaultSelected={existingTokens}/>
    );
  }
}

export default UserCompletion;
