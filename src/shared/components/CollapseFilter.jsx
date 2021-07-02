import React, { Component } from "react";
import { Collapse, Button } from "reactstrap";
import PropTypes from "prop-types";
import ChevronDown from "mdi-react/ChevronDownIcon";
import ChevronRight from "mdi-react/ChevronRightIcon";
import FilterIcon from "mdi-react/FilterIcon";

class CollapseFilter extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.bool,
    isOpen: PropTypes.bool,
    children: PropTypes.any.isRequired
  };
  static defaultProps = {
    className: null,
    isOpen: false,
    label: ""
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: props.isOpen };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { icon, children, label, className } = this.props;
    return (
      <div
        style={{
          borderBottom: !className && "1px solid #dcdcdc",
          marginBottom: "1em"
        }}
      >
        <Button
          className={
            className ? className : "MyCV-button__filter MyCV-filters__item"
          }
          onClick={this.toggle}
          style={{ marginBottom: "1rem" }}
        >
          {icon && (
            <FilterIcon
              style={{ fill: className ? "white" : "gray", marginTop: -5 }}
            />
          )}
          {label}
          {this.state.collapse ? (
            <span className="MyCV-chevron">
              <ChevronDown style={{ fill: className ? "white" : "gray" }} />
            </span>
          ) : (
            <span className="MyCV-chevron">
              <ChevronRight style={{ fill: className ? "white" : "gray" }} />
            </span>
          )}
        </Button>
        <Collapse isOpen={this.state.collapse}>{children}</Collapse>
      </div>
    );
  }
}

export default CollapseFilter;
