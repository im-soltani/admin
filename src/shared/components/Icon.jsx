import React from "react";
import PropTypes from "prop-types";

class Icon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    className: ""
  };

  render() {
    const { name, className } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`icon ${className}`.trim()}
      >
        <use
          xlinkHref={`/img/icons/sprite.svg#${name}`}
        />
      </svg>
    );
  }
}

export default Icon;
