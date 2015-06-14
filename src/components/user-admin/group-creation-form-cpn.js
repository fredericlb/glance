var React = require("react/addons");
import {Paper, TextField, RaisedButton} from "material-ui";
import groupsActions from "../../actions/groups-actions.js";

class GroupCreationForm extends React.Component {

  constructor() {
    super();
    this.state = {
      name: null
    };
  }

  onSubmit() {
    let {name} = this.state;

    let group = {
      name: name
    };

    if (name !== "") {
      groupsActions.save(group);
      this.reset();
    }

  }

  reset() {
    this.setState({
      name: null
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
