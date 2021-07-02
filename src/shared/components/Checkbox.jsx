import React from "react";
import PropTypes from "prop-types";

class Checkbox extends React.Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onCkeck: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string
  };

  static defaultProps = {
    className: "",
    checked: false
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
      label: props.label
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked });
    }
    if (nextProps.label !== this.props.label) {
      this.setState({ checked: nextProps.label });
    }
  }

  handlechange = () => {
    this.props.onCkeck(!this.state.checked, this.props.name);
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { checked, label } = this.state;
    return (
      <div className="wrapperd">
        <div className="wrapper-inner">
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={checked}
                name={this.props.name}
                onChange={this.handlechange}
              />
              <span>
                <svg viewBox="0 0 426.67 426.67">
                  <path d="M153.504,366.839c-8.657,0-17.323-3.302-23.927-9.911L9.914,237.265 c-13.218-13.218-13.218-34.645,0-47.863c13.218-13.218,34.645-13.218,47.863,0l95.727,95.727l215.39-215.386 c13.218-13.214,34.65-13.218,47.859,0c13.222,13.218,13.222,34.65,0,47.863L177.436,356.928C170.827,363.533,162.165,366.839,153.504,366.839z" />
                </svg>
              </span>
              <span style={{ display: "block ruby", width: "10rem" }}>{label}</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkbox;
