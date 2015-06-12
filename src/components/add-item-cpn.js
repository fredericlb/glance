var React = require("react/addons");
import {RaisedButton, Paper, Menu, TextField} from "material-ui";

var menuItems = [
    {payload: "1", text: "Accusé de lecture", toggle: true, defaultToggled: true},
    {payload: "2", text: "Nécessite validation", toggle: true}
];

const _s = {
  "base": {
    marginTop: 10
  },
  "field-paper": {
    padding: 10,
    marginTop: 10
  },
  "textarea": {
    width: "90%",
    border: 0
  },
  "flags": {
    marginTop: 10
  }
};


class AddItem extends React.Component {
    constructor () {
        super();
        this.state = {
            displayEditable: false
        };
    }

    renderAddButton() {
        var onButtonClicked = () => {
            this.setState({displayEditable: true});
        };
        return (
            <div className="button-bar">

            <RaisedButton label="Nouveau contenu" primary={true} onClick={onButtonClicked}/>
            </div>
        );
    }

    render() {
        let content;
        if (this.state.displayEditable) {
            content = this.renderEditable();
        } else {
            content = this.renderAddButton();
        }

        return <div style={_s.base}>{content}</div>;
    }

    renderEditable() {
        var onCancelButtonClicked = () => {
            this.setState({displayEditable: false});
        };

        return (
            <form>
                <Paper zDepth={1} style={_s["field-paper"]}>
                    <TextField hintText="Titre" multiLine={true} style={{width: "100%"}}/>
                    <TextField hintText="Description" multiLine={true} style={{width: "100%"}}/>
                </Paper>
                <div style={_s.flags}>
                    <Menu menuItems={menuItems} autoWidth={false}/>
                </div>

                <div className="button-bar">
                    <RaisedButton label="Annuler" onClick={onCancelButtonClicked} secondary={true}/>
                    <RaisedButton label="Ajouter" primary={true}/>
                </div>
            </form>
        );
    }
}



export default AddItem;
