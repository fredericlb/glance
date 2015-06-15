var React = require("react/addons");
import groupsStore from "../../stores/groups-store.js";
import {Style} from "../../utils/mixins-decorators";
import connectToStores from "alt/utils/connectToStores";

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
    top: -13,
    color: "#CDCDCD",

    $sub: {
      selected: {
        color: "red",
        $applyIf: (s, p) => p.isSelected
      }
    }
  }
})
class GroupItem extends React.Component {
  render() {
    let g = this.props.group;
    return (
      <div style={this._("card")}
        onClick={() => this.props.onSelect(g)}>
        <i className="mdi mdi-chevron-right"
          style={this._("arrow")}/>
        <h3>{g.name}</h3>
      </div>
    );
  }
}

@connectToStores
class GroupsList extends React.Component {

  static getStores() { return [groupsStore]; }
  static getPropsFromStores() { return {groups: groupsStore.getState()}; }

  render() {
    let groups = this.props.groups.list;
    let {width} = this.props;
    var _groups = groups.map(g => {
      var isSelected = this.props.selectedGroup && this.props.selectedGroup.$fbKey === g.$fbKey;
      return <GroupItem group={g} isSelected={isSelected} onSelect={this.props.onSelect} key={g.$fbKey}/>;
    });

    return (
      <div style={{margin: "0 20px 0 20px"}}>
        {_groups}
      </div>
    );

  }
}

export default GroupsList;
