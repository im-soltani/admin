import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const logo = `${process.env.PUBLIC_URL}/img/images/logo-SB.png`;

class Logo extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    home: PropTypes.bool
  };

  static defaultProps = {
    className: "",
    home: false
  };

  render() {
    const { className, home } = this.props;
    return (
      <div className={`logo ${className}`.trim()}>
        {home ? (
          <img className="logo__img" src={logo} />
        ) : (
          <Link to="/accueil">
            <img className="logo__img" src={logo} />
          </Link>
        )}
      </div>
    );
  }
}

export default Logo;
