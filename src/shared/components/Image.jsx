import React from "react";
import PropTypes from "prop-types";
const logo = `${process.env.PUBLIC_URL}/img/images/placeholder.jpg`;

class Image extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
  };

  static defaultProps = {
    className: ""
  };
  state = {
    src: this.props.name ? this.props.name : logo
  }
  render() {
    const { className } = this.props;
    return (
      <img
        className={className}
        src={this.state.src}
        onError={() => { this.setState({ src: logo }) }}
        alt={"logo"}
      />
    );
  }
}

export default Image;
