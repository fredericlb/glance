var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
import groupsActions from "../../actions/groups-actions.js";

class GroupEditionForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: null
    };
  }

  onSubmit() {
    let {name} = this.state;

    let group = {
      name: name,
      users: this.props.group.users
    };

    if (name !== "") {
      groupsActions.update(this.props.group, group);
      this.reset();
    }

  }

  reset() {
    this.setState({
      name: null
    });
  }

  updateGroupFromProps(group) {
    if (!group) {
      this.reset();
      return;
    }

    this.setState({
      name: group.name
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
