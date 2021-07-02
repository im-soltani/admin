import React from "react";
import PropTypes from "prop-types";

class Container extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
  };
  static defaultProps = {
    className: ""
  };

  render() {
    const { className, children } = this.props;
    return (
      <div className={`private-container ${className}`.trim()} id="app">
        {children}
      </div>
    );
  }
}

export default Container;
