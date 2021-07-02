import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

class Select extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    className: PropTypes.string,
    items: PropTypes.array,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    tri: PropTypes.string
  };

  static defaultProps = {
    className: "",
    checked: false,
    error: "",
    name: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      value: props.defaultValue
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ items: nextProps.items });
    }
  }

  handleChange = e => {
    this.props.onSelect(e.target.value, this.props.name);
    this.setState({ value: e.target.value });
  };

  render() {
    const { value, items } = this.state;
    const { className, name, error, tri } = this.props;
    return (
      <Input
        className={className}
        onChange={e => this.handleChange(e)}
        value={value}
        type="select"
        name={name}
        invalid={!!error}
      >
        <option value={null} key={Math.random()}>
          {tri ? "Trier par" : "Aucun(e)"}
        </option>
        {items &&
          items.map(item => {
            return (
              <option
                value={item.value ? item.value : item.id}
                key={item.id + "" + Math.random()}
              >
                {item.label ? item.label : item.name}
              </option>
            );
          })}
      </Input>
    );
  }
}

export default Select;
