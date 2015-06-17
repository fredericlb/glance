var React = require("react/addons");
import groupsStore from "../../stores/groups-store.js";
import {Style} from "../../utils/mixins-decorators";
import connectToStores from "alt/utils/connectToStores";
import {List, ListItem, Avatar} from "material-ui";

class GroupItem extends React.Component {
  render() {
    let g = this.props.group;
    return (
      <ListItem onTouchTap={() => this.props.onSelect(g)}>
        {g.name}
      </ListItem>
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
      <List subheader="Groupes">
        {_groups}
      </List>
    );

  }
}

export default GroupsList;
