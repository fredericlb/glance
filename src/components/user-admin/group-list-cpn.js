var React = require("react/addons");
import airflux from "airflux";
import groupsStore from "../../stores/groups-store.js";
import lo from "lodash";

const _s = {
  "base": {
    margin: "0 20px 0 20px"
  },
  "group-card": {
    margin: 10,
    cursor: "pointer",
    backgroundColor: "white",
    padding: 10,
    border: "1px solid #CDCDCD",
    borderLeft: "5px solid #CDCDCD",

    rules: {
      selected: {
        cursor: "auto",
        border: "1px solid red",
        borderLeft: "5px solid red"
      }
    }
  },
  "arrow": {
    fontSize: 48,
    float: "right",
    position: "relative",
    top: -13,
    color: "#CDCDCD",

    rules: {
      "selected": {
        color: "red"
      }
    }
  }
};

const S = (cls, rule) => {
  return lo.merge({}, _s[cls], _s[cls].rules[rule]);
};


class GroupsList extends airflux.FluxComponent {

  constructor (props) {
    super(props, {groups: groupsStore});
  }

  render() {
    let groups = this.state.groups.list;
    let {width} = this.props;

    var _groups = groups.map(g => {
      var isSelected = this.props.selectedGroup && this.props.selectedGroup.$fbKey === g.$fbKey;

      var arrowStyle = isSelected ? S("arrow", "selected") : _s.arrow;
      var cardStyle = isSelected ? S("group-card", "selected") : _s["group-card"];
      return (
        <div style={cardStyle} key={g.$fbKey}
          onClick={() => this.props.onSelect(g)}>
          <i className="mdi mdi-chevron-right"
            style={arrowStyle}/>
          <h3>{g.name}</h3>
        </div>
      );
    });

    return (
      <div style={_s.base}>
        {_groups}
      </div>
    );

  }
}

export default GroupsList;
