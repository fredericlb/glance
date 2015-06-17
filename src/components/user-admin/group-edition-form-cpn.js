var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
import groupsActions from "../../actions/groups-actions.js";
import UserCompletion from "../form/user-completion.js";

class GroupEditionForm extends React.Component {

  static propTypes = {
    group: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      name: null,
      users: []
    };
  }

  onSubmit() {
    let {name, users} = this.state;

    let group = {
      name: name,
      users: users
    };

    if (name !== "") {
      groupsActions.update(this.props.group, group);
      this.reset();
    }

  }

  reset() {
    this.setState({
      name: null,
      users: []
    });
  }

  updateGroupFromProps(group) {
    if (!group) {
      this.reset();
      return;
    }

    this.setState({
      name: group.name,
      users: group.users
    });
  }

  componentWillMount() {
    this.updateGroupFromProps(this.props.group);
  }

  componentWillReceiveProps(nextProps) {
    this.updateGroupFromProps(nextProps.group);
  }

  render() {
    let getMessageFor = (key) => {
      if (this.state[key] === "") {
        return "Ce champ est obligatoire";
      } else {
        return null;
      }
    };

    let onSubmit = (e) => {
      e.preventDefault();
      this.onSubmit();
    };

    let onFieldUpdate = (key) => {
      return (e) => {
        var updatedState = {};
        updatedState[key] = e.target.value;
        this.setState(updatedState);
      };
    };

    let onTokensChange = (tokens) => {
      let ids = tokens.map(
        t => t.split(/[<>]/)[1].replace(".", "!")
      );
      this.setState({users: ids});
    };

    return (
      <Paper zDepth={1}>
        <form style={{padding: 10}}>
          <h2>{this.props.group.name}</h2>
          <TextField floatingLabelText="Nom *"
            onChange={onFieldUpdate("name")} ref="name"
            value={this.state.name}
            errorText={getMessageFor("name")}
            style={{width: "100%"}}/>
          <div className="clearer"/>
          <h3 style={{marginTop: 20}}>Membres</h3>
          <UserCompletion onChange={onTokensChange}
            defaults={this.state.users}/>
          <RaisedButton label="Envoyer" primary={true}
            onClick={onSubmit}
            style={{width: "100%"}}/>
          <div className="clearer"/>
        </form>
      </Paper>
    );
  }
}

export default GroupEditionForm;
