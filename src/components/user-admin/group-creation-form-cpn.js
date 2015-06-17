var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
import groupsActions from "../../actions/groups-actions.js";
import UserCompletion from "../form/user-completion.js";

class GroupCreationForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: null,
      users: []
    };
  }

  onSubmit() {
    let group = {
      name: this.state.name,
      users: this.state.users
    };

    if (this.state.name === null) {
      this.state.name = "";
    }

    let {name} = this.state;
    if (name && name !== "") {
      groupsActions.save(group);
      this.reset();
    }

  }

  reset() {
    this.setState({
      name: null,
      users: []
    });
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

    let title = "Nouveau groupe";

    return (
      <Paper zDepth={1}>
        <form style={{padding: 10}}>
          <h2>{title}</h2>
          <TextField floatingLabelText="Nom *"
            onChange={onFieldUpdate("name")} ref="name"
            value={this.state.name}
            errorText={getMessageFor("name")}
            style={{maxWidth: "100%"}}/>
          <h3 style={{marginTop: 20}}>Membres</h3>
          <UserCompletion
            onChange={onTokensChange}/>
          <div className="clearer"/>
            <RaisedButton label="Envoyer" primary={true}
              onClick={onSubmit} style={{width: "100%"}}/>
          <div className="clearer"/>
        </form>
      </Paper>
    );
  }
}

export default GroupCreationForm;
